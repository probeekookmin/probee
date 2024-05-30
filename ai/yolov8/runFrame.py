import os
import cv2
from PIL import Image  
from ultralytics import YOLO
from ultralytics.utils.plotting import save_one_box
import torch
from datetime import datetime, timedelta
from pathlib import Path
import json
import re
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

# source video FPS 계산 함수
def get_video_fps(video_path):
    video = cv2.VideoCapture(video_path)
    fps = video.get(cv2.CAP_PROP_FPS)
    video.release()
    return fps

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = YOLO('/home/jongbin/Documents/GitHub/capstone-2024-14/capstone-2024-14/ai/yolov8/best.pt').to(device)

def save_image(modified_xyxy, frame, file_path):
    save_one_box(modified_xyxy, frame, file=file_path, BGR=True)

def run_Yolo_by_frame(cctvIds, save_path, startTime):
    start_total_time = time.time()  # 전체 실행 시간 측정을 위한 시작 시간 기록

    save_path = Path(save_path)
    save_path.mkdir(parents=True, exist_ok=True)
    categories = []
    annotations = []
    
    total_frame_time = 0
    total_yolo_time = 0
    total_postprocess_time = 0
    
    for cctv_id in cctvIds:
        source_path = f'/home/jongbin/Desktop/cctv/{cctv_id.id}/{startTime.split("T")[0]}' 
        if not os.path.exists(source_path):
            continue  # source_path가 존재하지 않으면 다음 반복으로 넘어감

        for filename in os.listdir(source_path):
            source = os.path.join(source_path, filename)
            start_time = extract_video_info(filename)
            cap = cv2.VideoCapture(source)  # 비디오 파일 열기
            fps = get_video_fps(source)  # FPS 계산
            stride = int(fps * 7)  # 현재는 10초당 한 번 탐색 진행, 수정 필요할 경우 fps * __ 수정하면 됨

            frame_num = 0   
            batch_size = 10
            frame_buffer = []

            while cap.isOpened():
                frame_start_time = time.time()
                ret, frame = cap.read()  # 프레임을 읽어옴
                frame_end_time = time.time()
                if not ret:
                    break
                
                frame_time = frame_end_time - frame_start_time
                total_frame_time += frame_time
                
                if frame_num % stride == 0:  # 일정 간격으로 프레임 추출
                    frame_buffer.append((frame, frame_num))
                    if len(frame_buffer) == batch_size:
                        process_frames(frame_buffer, start_time, fps, cctv_id, save_path)
                        frame_buffer = []

                frame_num += 1  # 프레임 번호 증가

            # 남은 프레임 처리
            if frame_buffer:
                process_frames(frame_buffer, start_time, fps, cctv_id, save_path)

            cap.release()

    # ==== 마지막 필터링 ==== #
    for filename in os.listdir(save_path):
        file_path = os.path.join(save_path, filename)
        img = cv2.imread(file_path)
        if img is None:
            continue
        h, w = img.shape[:2]

        # 검출 정확도 향상을 위해 h <= w인 이미지 삭제
        if h <= w or w < 80:
            os.remove(file_path)
        
        # 종횡비 안 맞는 이미지 한 번 더 삭제
        elif int(w / h * 10) / 10 != 3 / 5:
            os.remove(file_path)

    # ==== 2-stage 모델을 위한 annotation Json 파일 생성 ==== #
    annotation_idx = 0
    for filename in os.listdir(save_path):
        id = re.sub(r'\D', '', filename)
        annotation = {
            "image_id": annotation_idx,
            "id": id,
            "file_path": f"{save_path}/{filename}",
            "sentence": "",
            "onehot": []
        }
        categories.append(id)
        annotations.append(annotation)
        annotation_idx += 1

    data = {"categories": categories, "annotations": annotations}
    (save_path / 'annotations').mkdir(parents=True, exist_ok=True)  # annotations folder 생성
    jsonfiledir = f"{save_path}/annotations/annotations.json"  # TextReId모델에 맞게 구조 수정
    with open(jsonfiledir, "w") as f:
        json.dump(data, f)
    print("Save Json file.")
    end_total_time = time.time()  # 전체 실행 시간 측정을 위한 끝 시간 기록
    total_time = end_total_time - start_total_time  # 전체 실행 시간 계산
    print(f"Total time taken: {total_time} seconds")  # 전체 실행 시간 출력

    print(f"Total frame extraction time: {total_frame_time} seconds")
    print(f"Total YOLO inference time: {total_yolo_time} seconds")
    print(f"Total postprocessing time: {total_postprocess_time} seconds")

    return jsonfiledir

def process_frames(frame_buffer, start_time, fps, cctv_id, save_path):
    with ThreadPoolExecutor() as executor:
        save_tasks = []
        for frame, frame_num in frame_buffer:
            timestamp = start_time + timedelta(seconds=(frame_num // fps))
            img_name = str(cctv_id.id) + "_" + timestamp.strftime('%Y-%m-%d_%H-%M-%S')

            # 프레임을 YOLO 모델에 입력하여 객체 탐지 수행
            yolo_start_time = time.time()
            results = model(frame, device=device, show_conf=False)
            yolo_end_time = time.time()

            yolo_time = yolo_end_time - yolo_start_time

            postprocess_start_time = time.time()
            for r in results:
                for box in r.boxes:
                    xyxy = box.xyxy
                    for j in range(xyxy.size(0)):  # 바운딩 박스의 개수에 맞게 루프를 돌며 전처리 및 저장
                        # === 바운딩 박스 비율 조정 === #
                        target_ratio = 3 / 5

                        x1, y1, x2, y2 = xyxy[j]
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
                        modified_xyxy = [x1, y1, x2, y2]

                        # 검출된 이미지 저장
                        im0 = frame
                        file_path = save_path / f"{img_name}.jpg"
                        # 병렬 저장 작업 추가
                        save_tasks.append(executor.submit(save_image, modified_xyxy, im0, file_path))

            postprocess_end_time = time.time()
            postprocess_time = postprocess_end_time - postprocess_start_time

            # 각 프레임의 처리 시간 출력
            print(f"Frame number {frame_num}:")
            print(f"YOLO inference time: {yolo_time} seconds")
            print(f"Postprocessing time: {postprocess_time} seconds")
            print("-----------------------------")

        # 모든 저장 작업 완료 대기
        for task in as_completed(save_tasks):
            task.result()

def extract_video_info(filename):
    try:
        start_time = datetime.strptime(filename, '%Y%m%d-%H%M%S')  # 탐색 시작 시간
    except:
        temp = filename.split(".")[0]
        temp2 = temp.split("_")
        title = temp2[0].replace("-", "") + '-' + temp2[1].replace("-", "")
        start_time = datetime.strptime(title, '%Y%m%d-%H%M%S')
    return start_time  # 시간 형식 변환하여 반환

# from pydantic import BaseModel
# class CCTVInfo(BaseModel):
#     id : int
#     longitude : float
#     latitude : float
# run_Yolo_by_frame([CCTVInfo(id=12,longitude=1,latitude=1)], '/home/jongbin/Desktop/sss', '2024-05-11T01:01:01')