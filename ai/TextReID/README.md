# 실행코드

python3 test_net.py --config-file configs/cuhkpedes/moco_gru_cliprn50_ls_bs128_2048.yaml --checkpoint-file output/cuhkpedes/moco_gru_cliprn50_ls_bs128_2048/best.pth --data-dir datasets/cuhkpedes --query "a man wearing a white black top and white pants"

- 코드 안에서 QUERY를 받게 바꿨음



# 파이토치 GPU 버전 설치
pip install torch==1.10.0+cu113 torchvision==0.11.1+cu113 torchaudio==0.10.0+cu113 
-f https://download.pytorch.org/whl/torch_stable.html
