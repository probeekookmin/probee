import sys
import os
from pathlib import Path

import argparse
import time
import json
import re

import cv2
import torch
import torch.backends.cudnn as cudnn
import numpy as np

from models.experimental import attempt_load
from utils.datasets import LoadStreams, LoadImages
from utils.general import check_img_size, check_requirements, check_imshow, non_max_suppression, apply_classifier, \
    scale_coords, xyxy2xywh, strip_optimizer, set_logging, increment_path, check_file
from utils.plots import plot_one_box
from utils.torch_utils import select_device, load_classifier, time_synchronized
from ultralytics.utils.plotting import Annotator, colors, save_one_box
from utils.dataloaders import IMG_FORMATS, VID_FORMATS
from datetime import datetime,timedelta

FILE = Path(__file__).resolve()
ROOT = FILE.parents[0]  # YOLOv5 root directory
if str(ROOT) not in sys.path:
    sys.path.append(str(ROOT))  # add ROOT to PATH
ROOT = Path(os.path.relpath(ROOT, Path.cwd()))  # relative

def detect(save_img=False):
    source, weights, view_img, save_txt, imgsz = str(opt.source), opt.weights, opt.view_img, opt.save_txt, opt.img_size
    webcam = source.isnumeric() or source.endswith('.txt') or source.lower().startswith(
        ('rtsp://', 'rtmp://', 'http://'))
    is_file = Path(source).suffix[1:] in (IMG_FORMATS + VID_FORMATS)
    is_url = source.lower().startswith(("rtsp://", "rtmp://", "http://", "https://"))
    if is_url and is_file:
        source = check_file(source)  # download

    # Directories
    save_dir = Path(increment_path(Path(opt.project) / opt.name, exist_ok=opt.exist_ok))  # increment run
    (save_dir / 'labels' if save_txt else save_dir).mkdir(parents=True, exist_ok=True)  # make dir

    # Initialize
    set_logging()
    device = select_device(opt.device)
    half = device.type != 'cpu'  # half precision only supported on CUDA

    # Load model
    model = attempt_load(weights, map_location=device)  # load FP32 model
    stride = int(model.stride.max())  # model stride
    imgsz = check_img_size(imgsz, s=stride)  # check img_size
    if half:
        model.half()  # to FP16

    # Second-stage classifier
    classify = False
    if classify:
        modelc = load_classifier(name='resnet101', n=2)  # initialize
        modelc.load_state_dict(torch.load('weights/resnet101.pt', map_location=device)['model']).to(device).eval()

    # Set Dataloader
    if webcam:
        view_img = check_imshow()
        cudnn.benchmark = True  # set True to speed up constant image size inference
        dataset = LoadStreams(source, img_size=imgsz, stride=stride)
    else:
        save_img = True
        # dataset = LoadImages(source, img_size=imgsz, stride=stride)
        # model.warmup(imgsz=(1 if model.pt or model.triton else 1, 3, *imgsz))  # warmup
        dataset = LoadImages(source, img_size=imgsz, stride=stride)  # frame-rate 입력

    # Get names and colors
    names = model.module.names if hasattr(model, 'module') else model.names

    # Run inference
    if device.type != 'cpu':
        model(torch.zeros(1, 3, imgsz, imgsz).to(device).type_as(next(model.parameters())))  # run once
    t0 = time.time()
    prev_path = ''
    categories = []
    annotations = []
    for path, img, im0s, vid_cap in dataset:
        if path != prev_path:
            nfps = 0
        fps = vid_cap.get(cv2.CAP_PROP_FPS)
        img = torch.from_numpy(img).to(device)
        img = img.half() if half else img.float()  # uint8 to fp16/32
        img /= 255.0  # 0 - 255 to 0.0 - 1.0
        if img.ndimension() == 3:
            img = img.unsqueeze(0)

        # Inference
        t1 = time_synchronized()
        pred = model(img, augment=opt.augment)[0]

        # Apply NMS
        pred = non_max_suppression(pred, opt.conf_thres, opt.iou_thres, classes=opt.classes, agnostic=opt.agnostic_nms)
        t2 = time_synchronized()

        # Apply Classifier
        if classify:
            pred = apply_classifier(pred, modelc, img, im0s)

        # Process detections
        for i, det in enumerate(pred):  # detections per image
            if webcam:  # batch_size >= 1
                p, s, im0, frame = path[i], '%g: ' % i, im0s[i].copy(), dataset.count
            else:
                p, s, im0, frame = path, '', im0s, getattr(dataset, 'frame', 0)

            p = Path(p)  # to Path
            date_obj = datetime.strptime(p.stem, '%Y%m%d-%H%M%S')  # 탐색 시작 시간
            s += '%gx%g ' % img.shape[2:]  # print string

            if fps < 10:
                date_obj += nfps * timedelta(seconds=10)
            else:
                date_obj += nfps * timedelta(seconds=2)
            img_name = date_obj.strftime('%Y-%m-%d %H-%M-%S ')

            if len(det):
                # Rescale boxes from img_size to im0 size
                det[:, :4] = scale_coords(img.shape[2:], det[:, :4], im0.shape).round()

                # Print results
                for c in det[:, -1].unique():
                    n = (det[:, -1] == c).sum()  # detections per class
                    s += f"{n} {names[int(c)]}{'s' * (n > 1)}, "  # add to string

                # Write results
                for *xyxy, conf, cls in reversed(det):
                    # if save_img or view_img:  # Add bbox to image
                    label = f'{names[int(cls)]}'  # 정확도 제거
                    if opt.heads or opt.person:
                        if 'head' in label and opt.heads:
                            # plot_one_box(xyxy, im0, label=label, color=colors[int(cls)], line_thickness=3)
                            save_one_box(xyxy, im0, file=save_dir / "crops" / f"{p.stem}.jpg", BGR=True)
                        if 'person' in label and opt.person:
                            # ==== 이미지 저장 ==== #
                            # 1) 바운딩 박스 비율 (3:5) 조정
                            target_ratio = 3 / 5

                            x1, y1, x2, y2 = xyxy
                            width = x2 - x1
                            height = y2 - y1

                            current_ratio = torch.round(width / height * 10) / 10

                            if current_ratio > target_ratio:
                                # 현재 비율이 목표 비율보다 가로가 더 길다면 세로를 늘려줌 
                                new_height = width / target_ratio
                                y_center = (y1 + y2) / 2
                                y1 = y_center - (new_height // 2)
                                y2 = y_center + new_height - (new_height // 2)
                            elif current_ratio < target_ratio:
                                # 현재 비율이 목표 비율보다 세로가 더 길다면 가로를 늘려줌
                                new_width = height * target_ratio
                                x_center = (x1 + x2) / 2
                                x1 = x_center - new_width // 2
                                x2 = x_center + new_width - (new_width // 2)
                                                                
                            # 수정된 좌표 정정
                            xyxy = [x1, y1, x2, y2]

                            # 검출된 이미지 저장 
                            save_one_box(xyxy, im0, file=save_dir / "crops" / f"{img_name}.jpg", BGR=True)
                            
                            file_dir = os.path.join(save_dir, 'crops')
                            for filename in os.listdir(file_dir):
                                file_path = os.path.join(file_dir, filename)
                                img = cv2.imread(file_path)
                                h, w = img.shape[:2]

                                # 검출 정확도 향상을 위해 h <= w인 이미지 삭제
                                if h <= w:
                                    os.remove(file_path)
                                
                                # 종횡비 안 맞는 이미지 한 번 더 삭제
                                elif int(w/h * 10) / 10 != target_ratio:
                                    print("remove: ", int(w/h * 10) / 10)
                                    os.remove(file_path)

            # Print time (inference + NMS)
            print(f'{s}Done. ({t2 - t1:.3f}s)')

        nfps += 1
        prev_path = path


    # ==== annotation Json 파일 생성 ==== #
    file_dir = os.path.join(save_dir, 'crops')
    annotation_idx = 0
    for filename in os.listdir(file_dir):
        id = re.sub(r'\D', '', filename)
        annotation = {
            "image_id": annotation_idx,
            "id": id,
            "file_path": f"{save_dir}/crops/{filename}",
            "sentence": "",
            "onehot": []
            }
        categories.append(id)
        annotations.append(annotation)
        annotation_idx += 1

    data = {"categories": categories, "annotations": annotations}

    with open(f"{file_dir}/annotations.json", "w") as f:
        json.dump(data, f)
    print("Save Json file.")
    
    print(f'Done. ({time.time() - t0:.3f}s)')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--weights', nargs='+', type=str, default='yolov5s.pt', help='model.pt path(s)')
    parser.add_argument("--source", type=str, default=ROOT / "data/images", help="file/dir/URL/glob/screen/0(webcam)")
    parser.add_argument('--img-size', type=int, default=640, help='inference size (pixels)')
    parser.add_argument('--conf-thres', type=float, default=0.25, help='object confidence threshold')
    parser.add_argument('--iou-thres', type=float, default=0.45, help='IOU threshold for NMS')
    parser.add_argument('--device', default='', help='cuda device, i.e. 0 or 0,1,2,3 or cpu')
    parser.add_argument('--view-img', action='store_true', help='display results')
    parser.add_argument('--save-txt', action='store_true', help='save results to *.txt')
    parser.add_argument('--save-conf', action='store_true', help='save confidences in --save-txt labels')
    parser.add_argument('--classes', nargs='+', type=int, help='filter by class: --class 0, or --class 0 2 3')
    parser.add_argument('--agnostic-nms', action='store_true', help='class-agnostic NMS')
    parser.add_argument('--augment', action='store_true', help='augmented inference')
    parser.add_argument('--update', action='store_true', help='update all models')
    parser.add_argument('--project', default='runs/detect', help='save results to project/name')
    parser.add_argument('--name', default='exp', help='save results to project/name')
    parser.add_argument('--exist-ok', action='store_true', help='existing project/name ok, do not increment')
    parser.add_argument('--person', action='store_true', help='displays only person')
    parser.add_argument('--heads', action='store_true', help='displays only person')

    opt = parser.parse_args()
    print(opt)
    # check_requirements()

    with torch.no_grad():
        if opt.update:  # update all models (to fix SourceChangeWarning)
            for opt.weights in ['yolov5s.pt', 'yolov5m.pt', 'yolov5l.pt', 'yolov5x.pt']:
                detect()
                strip_optimizer(opt.weights)
        else:
            detect()
