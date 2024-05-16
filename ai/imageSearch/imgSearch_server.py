import os
import json
import time
import datetime
import shutil
from PIL import Image
from transformers import ViTImageProcessor, AutoModel
import argparse
import numpy as np
from datasets import load_dataset, DatasetDict

# ===== 입력 옵션 파싱
# parser = argparse.ArgumentParser()
# parser.add_argument('--data_path', type=str, help='YOLO 검출 결과 이미지가 저장된 폴더 경로')
# parser.add_argument('--topk', type=int, default=10, help='유사도 상위 #개 출력')
# parser.add_argument('--query', type=str, help='query img 경로')

# args = parser.parse_args()
model_ckpt = "microsoft/swinv2-large-patch4-window12to16-192to256-22kto1k-ft"
# model_ckpt = "microsoft/swinv2-tiny-patch4-window16-256"
processor = ViTImageProcessor.from_pretrained(model_ckpt)
model = AutoModel.from_pretrained(model_ckpt)

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

def run_Image_to_Image(data_path:str,topk:int,query:str):
    start_time = time.time()

    BATCH = 8
    # model_ckpt = "microsoft/swinv2-large-patch4-window12to16-192to256-22kto1k-ft"
    # # model_ckpt = "microsoft/swinv2-tiny-patch4-window16-256"
    # processor = ViTImageProcessor.from_pretrained(model_ckpt)
    # model = AutoModel.from_pretrained(model_ckpt)


    # ===== 데이터셋 로드 및 경로 추가
    dataset = load_dataset("imagefolder", data_dir=data_path)
    image_paths = load_image_paths(data_path)
    # 각 데이터셋 구성 요소에 대해 이미지 경로 추가
    for split in dataset.keys():
        dataset[split] = dataset[split].add_column("image_path", image_paths[:len(dataset[split])])
        print(split)
    # ===== 데이터셋에 임베딩 추출 함수 적용
    dataset = dataset['train'].map(
        extract_embeddings, batched=True, batch_size=BATCH
    )


    # ===== 임베딩을 기반으로 Faiss 인덱스 생성
    dataset.add_faiss_index(column='embeddings')
    # ===== 결과 저장
    scores, retrieved_examples = get_neighbors(query, dataset, topk)

    
    sec = time.time() - start_time
    times = str(datetime.timedelta(seconds=sec))
    short = times.split(".")[0]
    print(f"The 2nd search has ended. \nThe time required: {short} sec\n")
    return save_results(query, scores, retrieved_examples)

# ===== 사전학습 모델 세팅 및 특징 추출기 세팅
def load_image_paths(data_dir):
    image_paths = []
    for root, dirs, files in os.walk(data_dir):
        for file in files:
            if file.lower().endswith('.jpg'):
                full_path = os.path.join(root, file)
                image_paths.append(full_path)
    return image_paths




# ===== 유사 이미지 검색
def get_neighbors(query_image_path, dataset, top_k=10):
    query_image = Image.open(query_image_path)
    inputs = processor(images=query_image, return_tensors="pt")
    outputs = model(**inputs)
    qi_embedding = outputs.last_hidden_state[:, 0].detach().numpy().squeeze()
    scores, retrieved_examples = dataset.get_nearest_examples('embeddings', qi_embedding, k=top_k)
    return scores, retrieved_examples

# ===== 결과 저장을 위한 JSON 형식 정의
def default(o):
    if isinstance(o, np.float32):
        return float(o)

def save_results(query_image_path, scores, retrieved_examples):
    data_to_save = {
        "query_dir": query_image_path,
        "output": [
            {"output_dir": retrieved_examples['image_path'][i], "score": float(scores[i])}
            for i in range(len(scores))
        ]
    }
    return data_to_save
    
# ===== 이미지 그리드 생성
def image_grid(imgs, rows, cols):
    w, h = imgs[0].size
    grid = Image.new('RGB', size=(cols*w, rows*h))
    for i, img in enumerate(imgs):
        grid.paste(img, box=(i % cols * w, i // cols * h))
    return grid
