import json
import os
import shutil

# JSON 파일 경로
json_file_path = '/home/jongbin/Documents/GitHub/capstone-2024-14/capstone-2024-14/ai/TextReID/output/output.json'

# 이미지를 복사할 대상 폴더 경로
destination_folder = '/home/jongbin/Desktop/copied_images'

# 대상 폴더가 존재하지 않으면 생성
if not os.path.exists(destination_folder):
    os.makedirs(destination_folder)

# JSON 파일 읽기
with open(json_file_path, 'r') as json_file:
    data = json.load(json_file)

# 이미지 경로 리스트
image_paths = [entry['img_path'] for entry in data if 'img_path' in entry]

# 이미지 복사
for img_path in image_paths:
    if os.path.exists(img_path):
        shutil.copy(img_path, destination_folder)
        print(f"Copied: {img_path}")
    else:
        print(f"File not found: {img_path}")

print("Image copying completed.")
