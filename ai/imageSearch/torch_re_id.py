import os
from torchreid.utils import FeatureExtractor
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

extractor = FeatureExtractor(
    model_name='osnet_x1_0',
    model_path='ai/imageSearch/model.pth.tar-10', # 수정
    device='cuda'
)



def run_Image_to_Image(data_path:str,topk:int,query:str):
    start_time = time.time()
    dataset = load_dataset("imagefolder", data_dir=data_path)
    image_paths = load_image_paths(data_path)
        # 각 데이터셋 구성 요소에 대해 이미지 경로 추가
    for split in dataset.keys():
        dataset[split] = dataset[split].add_column("image_path", image_paths[:len(dataset[split])])

    
    embeddings = extractor(image_paths)
    embeddings_np = embeddings.cpu().numpy()
    embeddings_np = embeddings_np[:len(dataset[split])]
    dataset[split] = dataset[split].add_column("embeddings", list(embeddings_np))

    # ===== 임베딩을 기반으로 Faiss 인덱스 생성
    dataset = dataset['train']
    dataset.add_faiss_index(column='embeddings')


    # ===== 결과 저장
    scores, retrieved_examples = get_neighbors(dataset, query, topk)
    sorted_indices = np.argsort(scores)[::]
    images = [Image.open(query)]
    images.extend([Image.open(retrieved_examples["image_path"][i]) for i in range(len(scores))])
    search_result = image_grid(images, 2, (len(images) + 1) // 2)
    search_result.save('search_result_grid.jpg')
    save_results(query, scores, retrieved_examples, sorted_indices)
    
    sec = time.time() - start_time
    times = str(datetime.timedelta(seconds=sec))
    short = times.split(".")[0]
    print(f"The 2nd search has ended. \nThe time required: {short} sec\n")
    return save_results(query, scores, retrieved_examples,sorted_indices)

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
def get_neighbors(dataset, query_image_path, top_k=10):
    query_image = [query_image_path]
    qi_embedding = extractor(query_image).cpu().numpy()
    scores, retrieved_examples = dataset.get_nearest_examples('embeddings', qi_embedding, k=top_k)
    return scores, retrieved_examples

# ===== 결과 저장을 위한 JSON 형식 정의
def default(o):
    if isinstance(o, np.float32):
        return float(o)

def save_results(query_image_path, scores, retrieved_examples,sorted_indices):
    data_to_save = {
        "query_dir": query_image_path,
        "output": [
            {"output_dir": retrieved_examples['image_path'][i], "score": float(scores[i])}
            for i in sorted_indices
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
