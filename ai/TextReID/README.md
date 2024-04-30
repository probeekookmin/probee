# How to run the code
**requirements 설치**
```bash
pip install -r requirements.txt
```

**실행 코드**
```bash
# train
python train_net.py \
--config-file configs/cuhkpedes/moco_gru_cliprn50_ls_bs128_2048.yaml \
--data-dir datasets/cuhkpedes
```
```bash
# test
python3 test_net.py \
--config-file configs/cuhkpedes/moco_gru_cliprn50_ls_bs128_2048.yaml \
--checkpoint-file output/cuhkpedes/moco_gru_cliprn50_ls_bs128_2048/best.pth \
--data-dir datasets/cuhkpedes \
--query "a man wearing a white black top and white pants"
# 코드 안에서 QUERY를 받게 바꿨음
```

**파이토치 GPU 버전 설치**
```bash
pip install torch==1.10.0+cu113 torchvision==0.11.1+cu113 torchaudio==0.10.0+cu113 
-f https://download.pytorch.org/whl/torch_stable.html
```

---

# Text Based Person Search with Limited Data

[![PWC](https://img.shields.io/endpoint.svg?url=https://paperswithcode.com/badge/text-based-person-search-with-limited-data/nlp-based-person-retrival-on-cuhk-pedes)](https://paperswithcode.com/sota/nlp-based-person-retrival-on-cuhk-pedes?p=text-based-person-search-with-limited-data)

This is the codebase for our [BMVC 2021 paper](https://arxiv.org/abs/2110.10807).

Slides and video for the online presentation are now available at [BMVC 2021 virtual conference website](https://www.bmvc2021-virtualconference.com/conference/papers/paper_0044.html).