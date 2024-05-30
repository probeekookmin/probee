import os
import time
import datetime
import numpy as np
from PIL import Image
from torchreid.utils import FeatureExtractor
from datasets import load_dataset, Dataset, concatenate_datasets

# ===== 이미지 경로 로드
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
def save_results(query_image_path, scores, retrieved_examples, sorted_indices):
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
    grid = Image.new('RGB', size=(cols * w, rows * h))
    for i, img in enumerate(imgs):
        grid.paste(img, box=(i % cols * w, i // cols * h))
    return grid

# ===== 배치별로 이미지 임베딩 생성
def process_batch(batch_image_paths):
    dataset = Dataset.from_dict({"image_path": batch_image_paths})
    embeddings = extractor(batch_image_paths)
    embeddings_np = embeddings.cpu().numpy()
    dataset = dataset.add_column("embeddings", list(embeddings_np))
    return dataset

# ===== 이미지 to 이미지 검색 함수
def run_Image_to_Image(data_path: str, topk: int, query: str):
    start_time = time.time()
    image_paths = load_image_paths(data_path)
    
    batch_size = 1500
    batches = [image_paths[i:i + batch_size] for i in range(0, len(image_paths), batch_size)]
    
    all_datasets = []
    
    for batch in batches:
        batch_dataset = process_batch(batch)
        all_datasets.append(batch_dataset)
    
    dataset = concatenate_datasets(all_datasets)
    dataset.add_faiss_index(column='embeddings')
    
    scores, retrieved_examples = get_neighbors(dataset, query, topk)
    sorted_indices = np.argsort(scores)[::-1]
    
    images = [Image.open(query)]
    images.extend([Image.open(retrieved_examples["image_path"][i]) for i in sorted_indices])
    search_result = image_grid(images, 2, (len(images) + 1) // 2)
    search_result.save('search_result_grid.jpg')
    
    result = save_results(query, scores, retrieved_examples, sorted_indices)
    
    sec = time.time() - start_time
    times = str(datetime.timedelta(seconds=sec)).split(".")[0]
    print(f"The 2nd search has ended. \nThe time required: {times} sec\n")
    
    return result

# ===== 사전학습 모델 세팅 및 특징 추출기 세팅
extractor = FeatureExtractor(
    model_name='osnet_x1_0',
    model_path='ai/imageSearch/model.pth.tar-10',  # 수정
    device='cuda'
)

# 예시 실행
# result = run_Image_to_Image("/home/jongbin/Desktop/firstResult/76", 20, "/home/jongbin/Desktop/yolo/174/18_2024-05-12_16-10-10 488.jpg")
