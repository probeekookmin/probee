# TODO
# [x] 1. 욜로 결과 이미지에서 해상도 너무 낮은 거 지우기 → 일단 가로 60픽셀 미만인 이미지 삭제; 영상 해상도에 따라 조정 필요
# [ ] 2. base 모델 변경
# [ ] 3. 데이터 증강 -> 로테이션만 적용
# [ ] 4. image 크기 grid 전에 맞추기
# [ ] 5. 배경 지우기

import os
import json
import time
import datetime
from PIL import Image
from torchvision import transforms
import argparse
import numpy as np
import torch
from functools import partial
from datasets import load_dataset, Dataset
from transformers import ViTImageProcessor, AutoModel

# ===== 입력 옵션 파싱
parser = argparse.ArgumentParser()
parser.add_argument('--data_path', type=str, help='YOLO 검출 결과 이미지가 저장된 폴더 경로')
parser.add_argument('--topk', type=int, default=10, help='유사도 상위 #개 출력 (기본 10)')
parser.add_argument('--query', type=str, help='query img 경로')

args = parser.parse_args()

# ===== 사전학습 모델 세팅 및 특징 추출기 세팅
BATCH = 16
model_ckpt = "google/vit-large-patch16-224"
processor = ViTImageProcessor.from_pretrained(model_ckpt)
model = AutoModel.from_pretrained(model_ckpt)


# ===== 해상도 낮은 이미지 삭제
def filtering(directory):
    for filename in os.listdir(directory):
        file_path = os.path.join(directory, filename)
        if filename.lower().endswith('.jpg'):
            with Image.open(file_path) as img:
                width, height = img.size
                
                # 너비가 60 미만인 경우, 파일 삭제
                if width < 60:
                    os.remove(file_path)

filtering(args.data_path)

# ===== 데이터셋 로드 및 경로 추가
dataset = load_dataset("imagefolder", data_dir=args.data_path)

def load_image_paths(data_dir, example):
    for root, dirs, files in os.walk(data_dir):
        for file in files:
            if file.lower().endswith('.jpg'):
                example['image_path'] = str(os.path.join(root, file))
    return example

partial_load_image_paths = partial(load_image_paths, args.data_path)
dataset = dataset.map(partial_load_image_paths)


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
print("\nStart embedding extraction...")
start_time = time.time()

dataset = dataset['train'].map(
    extract_embeddings, batched=True, batch_size = BATCH
)

sec = time.time() - start_time
 
times = str(datetime.timedelta(seconds=sec))
short = times.split(".")[0]
print(f"End embedding extraction - {short} sec\n")

# ===== 임베딩을 기반으로 Faiss 인덱스 생성
dataset.add_faiss_index(column='embeddings')

# ===== 유사 이미지 검색
def get_neighbors(query_image_path, top_k=10):
    query_image = Image.open(query_image_path)
    qi_embedding = model(**processor(images=query_image, return_tensors="pt"))   # 쿼리 이미지 특징 추출
    qi_embedding = qi_embedding.last_hidden_state[:, 0].detach().numpy().squeeze()  # 쿼리 이미지의 임베딩 추출
    scores, retrieved_examples = dataset.get_nearest_examples('embeddings', qi_embedding, k=top_k)
    return scores, retrieved_examples  # 유사도 점수와 인덱스 반환

# ===== 이미지 그리드 생성
def image_grid(imgs, rows, cols):
    w,h = imgs[0].size
    grid = Image.new('RGB', size=(cols*w, rows*h))
    for i, img in enumerate(imgs): grid.paste(img, box=(i%cols*w, i//cols*h))
    return grid


# ===== 결과 저장을 위한 JSON 형식 정의
def default(o):
    if isinstance(o, np.float32):  # np.float32 인 경우 float로 변환
        return float(o)
    
def save_results(query_image_path, results):
    data_to_save = {
        "query_dir": query_image_path,
        "output": [
            {"output_dir": retrieved_examples['image_path'][i], "score": scores[i]}
            for i in range(len(scores))
        ]
    }
    with open('results.json', 'w', encoding='utf-8') as f:
        json.dump(data_to_save, f, ensure_ascii=False, indent=4,  default=default)

# ===== 결과 저장
scores, retrieved_examples = get_neighbors(args.query, args.topk)
sorted_indices = np.argsort(scores)[::-1]  # 점수 높은 순으로 정렬

images = [Image.open(args.query)]
images.extend([retrieved_examples["image"][i] for i in sorted_indices])
search_result = image_grid(images, 2, (len(images) + 1) // 2)
search_result.save('search_result_grid.jpg')

save_results(args.query, (scores, retrieved_examples))
