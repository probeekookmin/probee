# TODO
# [x] 1. 욜로 결과 이미지에서 해상도 너무 낮은 거 지우기 → 영상 해상도에 따라 조정 필요
# [x] 2. base 모델 변경 → ViT에서 SwinV2로 변경
# [ ] 3. 데이터 증강 -> 로테이션만 적용
# [ ] 4. image 크기 grid 전에 맞추기
# [ ] 5. 배경 지우기

import os
import json
import time
import datetime
import shutil
from PIL import Image
from torchvision import transforms
import argparse
import numpy as np
import torch
from functools import partial
from datasets import load_dataset, DatasetDict
from transformers import ViTImageProcessor, AutoModel


# ===== 입력 옵션 파싱
parser = argparse.ArgumentParser()
parser.add_argument('--data_path', type=str, help='YOLO 검출 결과 이미지가 저장된 폴더 경로')
parser.add_argument('--topk', type=int, default=10, help='유사도 상위 #개 출력')
parser.add_argument('--query', type=str, help='query img 경로')

args = parser.parse_args()


# ===== 사전학습 모델 세팅 및 특징 추출기 세팅
start_time = time.time()

BATCH = 16
model_ckpt = "microsoft/swinv2-large-patch4-window12to16-192to256-22kto1k-ft"
# model_ckpt = "microsoft/swinv2-tiny-patch4-window16-256"
processor = ViTImageProcessor.from_pretrained(model_ckpt)
model = AutoModel.from_pretrained(model_ckpt)


# ===== 데이터셋 로드 및 경로 추가
def load_image_paths(data_dir):
    image_paths = []
    for root, dirs, files in os.walk(data_dir):
        for file in files:
            if file.lower().endswith('.jpg'):
                full_path = os.path.join(root, file)
                image_paths.append(full_path)
    return image_paths

dataset = load_dataset("imagefolder", data_dir=args.data_path)
image_paths = load_image_paths(args.data_path)

# 각 데이터셋 구성 요소에 대해 이미지 경로 추가
for split in dataset.keys():
    dataset[split] = dataset[split].add_column("image_path", image_paths[:len(dataset[split])])


# ===== 임베딩 추출 (img > feature > embeddings)
def extract_embeddings(example):
    if isinstance(example['image'], str):
        image = Image.open(example['image'])
    else:
        image = example['image']
    
    inputs = processor(images=image, return_tensors="pt")
    outputs = model(**inputs)
    features = outputs.last_hidden_state[:, 0].detach().cpu().numpy()
    
    return {'embeddings': features.squeeze()}


# ===== 데이터셋에 임베딩 추출 함수 적용
dataset = dataset['train'].map(
    extract_embeddings, batched=True, batch_size=BATCH
)


# ===== 임베딩을 기반으로 Faiss 인덱스 생성
dataset.add_faiss_index(column='embeddings')


# ===== 유사 이미지 검색
def get_neighbors(query_image_path, top_k=10):
    query_image = Image.open(query_image_path)
    inputs = processor(images=query_image, return_tensors="pt")
    outputs = model(**inputs)
    qi_embedding = outputs.last_hidden_state[:, 0].detach().numpy().squeeze()
    scores, retrieved_examples = dataset.get_nearest_examples('embeddings', qi_embedding, k=top_k)
    return scores, retrieved_examples


# ===== 이미지 그리드 생성
def image_grid(imgs, rows, cols):
    w, h = imgs[0].size
    grid = Image.new('RGB', size=(cols*w, rows*h))
    for i, img in enumerate(imgs):
        grid.paste(img, box=(i % cols * w, i // cols * h))
    return grid


# ===== 결과 저장을 위한 JSON 형식 정의
def default(o):
    if isinstance(o, np.float32):
        return float(o)

def save_results(query_image_path, scores, retrieved_examples, sorted_indices):
    data_to_save = {
        "query_dir": query_image_path,
        "output": [
            {"output_dir": retrieved_examples['image_path'][i], "score": scores[i]}
            for i in sorted_indices
        ]
    }
    with open('results.json', 'w', encoding='utf-8') as f:
        json.dump(data_to_save, f, ensure_ascii=False, indent=4, default=default)


# ===== 결과 저장
scores, retrieved_examples = get_neighbors(args.query, args.topk)
sorted_indices = np.argsort(scores)[::-1]

images = [Image.open(args.query)]
images.extend([Image.open(retrieved_examples["image_path"][i]) for i in sorted_indices])
search_result = image_grid(images, 2, (len(images) + 1) // 2)

search_result.save('search_result_grid.jpg')
save_results(args.query, scores, retrieved_examples, sorted_indices)

new_folder_path = "/Users/lim/Develop/Capston/capstone-2024-14/ai/imageSearch/result"

if not os.path.exists(new_folder_path):
    os.makedirs(new_folder_path)

for i in sorted_indices:
    original_file_path = retrieved_examples["image_path"][i]
    new_file_path = os.path.join(new_folder_path, os.path.basename(original_file_path))
    shutil.copy(original_file_path, new_file_path)

sec = time.time() - start_time
times = str(datetime.timedelta(seconds=sec))
short = times.split(".")[0]
print(f"The 2nd search has ended. \nThe time required: {short} sec\n")
