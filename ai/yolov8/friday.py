import cv2
from ultralytics import YOLO
from ultralytics.utils.plotting import save_one_box
import torch
from datetime import datetime, timedelta
import time
import os
from pathlib import Path
import requests
from dotenv import load_dotenv

load_dotenv()
SERVER_URL = os.getenv("AI_SERVER_URL")
# source video FPS 계산 함수
def get_video_fps(video):
    fps = video.get(cv2.CAP_PROP_FPS)
    return fps

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = YOLO('/Users/nojongbin/Desktop/capstone-2024/ai/yolov8/best.pt').to(device)

def send_images_to_server(file_paths, url=SERVER_URL):
    files = [('files', (os.path.basename(file_path), open(file_path, 'rb'))) for file_path in file_paths]
    response = requests.post(url, files=files)
    return response

def run_Yolo_webcam(save_path):
    save_path = Path(save_path)
    save_path.mkdir(parents=True, exist_ok=True)

    cap = cv2.VideoCapture(0)  # 웹캠 사용
    if not cap.isOpened():
        print("웹캠을 열 수 없습니다.")
        return

    fps = get_video_fps(cap)  # FPS
    stride = int(fps * 7)  # 7초 간격

    start_time = datetime.now()

    frame_num = 0
    while True:
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_num)  # 현재 탐색 중인 프레임으로 이동
        ret, frame = cap.read()  # 프레임을 읽어옴
        if not ret:
            break
        
        saved_file_paths = []  # 각 주기 동안 저장된 파일 경로를 저장할 리스트
        
        results = model.predict(frame)
        for i, r in enumerate(results):
            timestamp = start_time + timedelta(seconds=frame_num / fps)
            img_name = timestamp.strftime('%Y-%m-%d_%H-%M-%S ')

            for box in r.boxes:
                xyxy = box.xyxy
                for j in range(xyxy.size(0)):  # 바운딩 박스의 개수에 맞게 루프를 돌며 전처리 및 저장
                    # === 바운딩 박스 비율 조정 === #
                    target_ratio = 3/5

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
                    # 해당 프레임을 컬러 이미지 input으로 변환
                    im0 = frame

                    # 파일 경로 생성 및 이름 지정
                    file_path = save_path / f"{img_name}.jpg"

                    # 디렉토리가 존재하지 않는 경우 생성 후 저장
                    save_one_box(modified_xyxy, im0, file=file_path, BGR=True)
                    
                    # 저장된 파일 경로 추가
                    saved_file_paths.append(file_path)

        frame_num += stride
        # 7초마다 저장된 모든 이미지 서버로 전송
        if saved_file_paths:
            response = send_images_to_server(saved_file_paths)
            print(f"Images sent to server, response status code: {response.status_code}")
        
        time.sleep(7)  # 7초 대기
        # 'q' 키를 누르면 루프 종료
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

    # ==== 마지막 필터링 ==== #
    target_ratio = 3/5
    for filename in os.listdir(save_path):
        file_path = os.path.join(save_path, filename)
        img = cv2.imread(file_path)
        h, w = img.shape[:2]

        # 검출 정확도 향상을 위해 h <= w인 이미지 삭제
        if h <= w or w < 80:
            os.remove(file_path)
        
        # 종횡비 안 맞는 이미지 한 번 더 삭제
        elif int(w/h * 10) / 10 != target_ratio:
            os.remove(file_path)

# 실행 예시
save_path = "/Users/nojongbin/Desktop/capstone-2024/test"
run_Yolo_webcam(save_path)
