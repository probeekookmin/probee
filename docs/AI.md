---
layout: default
title: AI 기술 안내
nav_exclude: true
---

# AI 기술 안내
{: .no_toc .fw-700 .text-blue-000}

<br/>
<div align="center">
    <img alt="AI 프로세스" src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/b9cdb88c-fcf7-482c-970a-8a1b17683273">
</div>
<br/>

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Yolov8
{: .fw-700}

YOLO(You Only Look Once)는 Object Detection을 목적으로 만들어진 모델입니다. YOLO는 이름 그대로 이미지를 한 번만 보고 물체를 검출할 수 있어 실시간으로 정확한 객체 검출이 가능하다는 장점이 있습니다. YOLOv1의 등장 이후 현재까지 꾸준히 새로운 버전을 발표하고 있으며, 많은 Object Detection 작업에 사용되고 있는 모델입니다.

이번 프로젝트에서는 CCTV 영상에서 사람을 검출해내기 위해 YOLO를 사용하였는데, 이때 검출해낸 사람의 이미지와 인상착의 텍스트 정보를 대조해 유사도를 계산해야 하므로 전신 이미지를 검출해야 했습니다.

<div align="center">
    <img src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/9f512d4c-3ad7-4598-9ced-35cea6dbbc17">
</div>

이에 YOLO의 다양한 버전 중 YOLOv8을 택해 학습을 진행하였습니다. YOLOv8은 보편화된 가장 최신 모델로 Feature Pyramid Network(FPN)와 Path Aggregation Network(PAN)를 결합한 새로운 아키텍처를 도입하였습니다. 또한 YOLOv8은 COCO 데이터셋과 여러 데이터셋을 혼합해 학습된 반면, YOLOv8과 유사한 성능 지표를 가진 YOLOv5는 주로 COCO 데이터셋을 통해 학습되었습니다. 이로 인해 YOLOv8은 더 다양한 이미지에 대해 향상된 성능을 보였습니다.

<div align="center">
    <img src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/82df6a26-0ffe-47f7-92cc-1b8bba41ae09">
</div>

YOLOv8는 YOLOv5와 비교해 더 나은 mAP를 달성하였으며, 더 적은 outlier를 검출하였습니다.

<div align="center">
    <img src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/69b32173-0590-45a4-b070-dfb53e95dccc">
</div>

더 나아가 학습에는 다양한 크기의 YOLOv8 중 다양한 performance metric을 비교해 YOLOv8m 모델을 적용하였습니다.

<br/>

학습 데이터셋은 CrowdHuman: A Benchmark for Detecting Human in a Crowd (Shao et al., 2018)에서 제안된 CrowdHuman 데이터셋을 사용하였습니다.

<div align="center">
    <img src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/ddf63279-8e2b-4375-b1ee-d99deaf83df0">
</div>

CrowdHuman 데이터셋은 full b-box를 가진 다른 human detection 데이터셋 중 인물의 수가 가장 많았던 CityPersons 데이터셋과 비교해 약 4배의 이미지, 17.7배의 인물을 포함하고 있습니다. 따라서 여러 human detection 데이터셋 중 CrowdHuman 데이터셋을 선택하였습니다. 해당 데이터셋은 15000장의 train 이미지, 4370장의 validation 이미지, 5000장의 test 이미지로 구성되어 있습니다. 또한 a head bounding-box, human visible-region bounding-box and human full-body bounding-box의 주석이 달려 있어, task와 일치하는 human full-body bounding-box만 사용해 학습하였습니다. 학습 결과 train과 validation 데이터셋의 다양한 loss가 모두 0에 수렴하는 모습을 확인할 수 있었고, 여러 정확도 지표 또한 1에 가까운 값으로 수렴하는 모습을 보였습니다.

<div align="center">
    <img src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/41dfb732-d967-4f33-b886-21fe63774453">
</div>

우리의 input은 CCTV 영상이므로 매 프레임마다 검출 및 저장을 진행할 경우 유사한 이미지가 여러 장 저장되는 경우가 있을 거라 생각했고, 이것이 실종자와 유사한 이미지 후보를 만드는 데에 나쁜 영향을 미칠 것이라 판단하였습니다. 따라서 Python의 OpenCV 라이브러리를 통해 영상을 받아오는 과정에서 검출을 진행하는 프레임 간격을 조정하였습니다.

또한 구현된 웹 페이지에 후보 이미지로 띄워줄 것을 고려해 검출된 이미지 중 width 80 미만인 이미지는 삭제하고, 이미지가 3:5의 일정한 종횡비를 맞춰 저장되도록 구현하였습니다.

<br/>

## Text Based Person Search
{: .fw-700}

Text Based Person Search(이하, TBPS)는 Person search with natural language description (Li et al., 2017)에서 처음 제안되었습니다. TBPS는 주어진 텍스트 설명을 바탕으로 해당하는 인물의 이미지를 검출하는 작업입니다. Li et al.(2017)에서는 CUHK-PEDES라는 데이터셋을 함께 제안하였으며, 해당 데이터셋은 13,003명의 사람들의 40,206개 이미지를 가지고 있습니다. 각 이미지에는 이미지를 설명하는 주석이 2문장씩 달려 있으며, 사람의 외모, 행동, 자세 및 다른 객체와의 상호작용에 대한 풍부한 세부 정보를 포함하고 있습니다. 

이번 프로젝트에서는 YOLO로 검출해낸 전신 이미지에 대해, 인상착의 정보를 담은 텍스트 쿼리를 넣어 해당 쿼리와 유사한 인상착의를 가진 이미지를 검출하는 것을 목표로 설정하였습니다. 이러한 작업을 수행하기 위해 Text-Based Person Search with Limited Data(Han et al., 2021)에서 제안한 모델을 사용하기로 하였습니다.

<div align="center">
    <img src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/3e784972-eb04-4e69-a8bb-7963cf95f2e1">
</div>

### 커스텀 데이터셋에 대해 동작 시키기 위한 코드 수정 및 인코더 구현
{: .no_toc .fw-700}

YOLO에서 검출된 사람 이미지를 바탕으로 인물 식별이 진행되어야 하기 때문에, 모델이 커스텀 데이터셋에 대해서도 동작할 수 있도록 수정하였습니다. 하지만 해당 모델은 데이터셋 내에 있는 사전 인코딩 된 주석을 사용하여 조건에 해당되는 이미지를 검출할 수 있도록 하고 있었기에, 커스텀 데이터셋에 대해 적용할 때는 조건으로 들어가게 되는 문장을 별도 입력으로 받을 수 있게 수정하였습니다. 

입력으로 받는 문장은 자연어이기 때문에, 해당 문장의 인코딩하기 위한 별도의 인코더를 추가하였습니다. 이때 모델이 주목해야 할 것은 문장의 맥락이 아닌, 실종자의 핵심 정보(상의와 하의 종류, 색 등)이기에, 단어의 의미에 주목하여 탐색을 할 수 있도록 원 핫 인코딩(one-hot encoding)의 형태로 인코더를 만들었습니다. 인코딩은 CUHK-PEDES 데이터셋에서 사용된 인코딩을 기반으로 하되, 해당 데이터셋에서 등장하지 않은 단어들에 대해서도 동작할 수 있도록 word dictionary 형태로 단어와 정수를 매칭하는 방식으로 구성 후, 인코딩을 진행하도록 하였습니다. 

### ICFG-PEDES 데이터셋을 사용한 모델 재학습 
{: .no_toc .fw-700}

TBPS 작업을 수행하기 위해 사용한 모델은 작은 데이터셋만으로도 좋은 학습이 가능하도록 만들어진 모델입니다. 그러나 반환된 결과의 Top 10 Accuracy를 기준으로 비교하였을 때 다른 모델에 비해 좋은 성능을 보였기 때문에, 프로젝트의 수행을 위해서는 모델의 재학습이 필요했습니다. 반환된 상위 10개의 결과 중 단 하나의 정답 값만이 존재하는 방식으로 성능을 평가하면, 보호자가 실종자와 유사하다고 판단되는 이미지를 선별하는 과정에서 피로도를 느낄 것이라고 생각하였습니다. 

모델 평가에 있어 충분한 성능이 나오지 않은 이유는 작은 데이터셋을 통한 학습이 문제일 것이라고 생각하여서, ICFG-PEDES라는 새로운 데이터셋을 바탕으로 모델을 다시 학습시키는 방식을 선택하였습니다. 해당 데이터셋은 CUHK-PEDES와 동일하게 TBPS를 목적으로 구축된 데이터셋입니다. 본 데이터셋은 대상 이미지가 주어졌을 때 해당 이미지와 같은 사람을 판별하기 위해 만들어진 MSMT17 데이터셋에서 이미지 수집 후 해당 이미지를 설명하는 문장을 추가하는 방식으로 구축되었습니다. 해당 데이터셋을 제안한 논문인 Semantically Self-Aligned Network for Text-to-Image Part-aware Person Re-identification(Ding et al., 2021)에서 CUHK-PEDES와 ICFG-PEDES 데이터셋을 함께 사용하였기 때문에, ICFG-PEDES의 annotation 파일 구성은 CUHK-PEDES와 동일하게 이루어져 있습니다. 

ICFG-PEDES 데이터셋을 통해 word dictionary를 구축하는 과정에서, CUHK-PEDES의 이미지 묘사에 있어서는 나타나지 않은 단어들이 여럿 나타나는 것을 확인하였습니다. 그렇기에 텍스트 쿼리를 학습하는 GRU 모델는 전체적으로 학습을 다시 진행하고, 이미지의 특징을 추출하는 ResNet50 모델은 마지막 레이어에 대해서만 재학습을 진행하기로 선택하였습니다. ICFG-PEDES와 CUHK-PEDES 데이터셋의 구축 목적이 동일 인물을 판별하기 위한 Person ReID 수행으로 동일하며, 각 데이터셋은 인종 구분 없이 다양한 이미지들로 구성되어 있어 데이터의 구성에 있어 큰 차이가 없다고 판단했기 때문입니다.

<div align="center">
    <img src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/856a23ba-4394-43c1-8dc7-aa74d1ff9ec4">
</div>

<div align="center">
    <img src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/b19be955-7df6-4403-b064-1c816d35aa81">
</div>

다음 그림은 “A woman is wearing a black shirt. She has long hair. She is carrying a bag.” (그 여성은 검은 셔츠를 입고 있다. 그녀는 긴 머리를 가지고 있으며, 가방을 들고 있다.) 라는 문장을 입력 받았을 때의 결과입니다. Fig. 25는 모델 재학습을 진행하기 전의 결과이며, Fig. 26은 모델 재학습을 진행한 후의 결과입니다. 각 그림은 동일한 문장에 대해 상위 10개의 결과를 각각 반환하고 있습니다.

모델 재학습 이전에는 ‘가방’이라는 요소에 주목하여, 사람의 성별(여성)과 인상착의(검은 셔츠)를 무시하고 있지만, 모델 재학습 이후에는 성별과 인상착의, 가방의 유무 모두 반영된 결과를 출력하는 것을 확인할 수 있습니다.

### 인상착의 정보를 받아 문장 형태의 쿼리 생성
{: .no_toc .fw-700}

1차 탐색에서 사용되는 TBPS 모델은 사람의 인상착의 정보가 담긴 문장을 받아, 해당 정보와 일치하는 이미지를 검출합니다. 이때 입력되는 문장 쿼리는 영어로 작성되어야 했지만, 사용자의 화면에서는 한글로 보여주어야 할 필요가 있었습니다. 이에 경찰이 실종 정보를 등록하는 과정에서 실종자의 인상착의를 입력하면, 입력된 토글의 요소를 바탕으로 영문 및 한글 쿼리를 생성해주기 위한 코드를 작성하였습니다.

영어의 경우 한국어 쿼리에 비해 만들어지는 문장 구조가 다양하지 않아 조건문을 통해 해결이 가능하였지만, 한국어 쿼리의 경우 선택되는 토글에 따라 조사가 다양하게 변화하는 관계로 조건문을 활용한 생성이 매우 까다로웠습니다. 또한 영어 쿼리의 경우 모델에게 정보를 제공하기 위한 목적이므로 완성된 문장형으로 정보를 구분해 넣어주어야 했지만, 한국어 쿼리의 경우 정보가 화면에 띄워질 것을 고려해 최대한 간결하게 요약할 필요가 있었습니다.

<div align="center">
    <img src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/1a63ed25-4c8f-4f57-8b27-d6f2c8c0edb7">
</div>

따라서 프론트 웹 페이지에서 경찰에 의해 선택된 토글을 바탕으로 영어 쿼리를 생성하고, OpenAI API를 사용해 Large Language Model인 ‘gpt-3.5-turbo’를 통한 한국어 쿼리 생성을 진행하였습니다. 이때 단순히 번역을 해주는 것을 넘어 원하는 문장의 형태로 모든 쿼리를 통일해야 했습니다. 이는 API를 가져올 때 ChatGPT가 만들어낼 내용에 원하는 내용을 상세히 기재하고, 다양하고 창의적인 답변을 제한하는 여러 파라미터를 조절함으로써 해결하였습니다.

<div align="center">
    <img src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/19182e90-2228-4b21-8494-361da3a8c90b">
</div>

<br/>

## Image Similarity
{: .fw-700}

본 프로젝트에서는 실종자를 찾기 위해 2번의 탐색을 진행합니다. 먼저 인물의 인상착의 정보를 입력으로 받아 1차 탐색, 즉 Text Based Person Search를 진행합니다. 1차 탐색 결과는 보호자에게 전송되고, 보호자는 그 중 실종자와 가장 유사한 이미지를 선택합니다. 여기서 보호자에 의해 선택된 실종자와 가장 유사한 이미지를 입력으로 하여 2차 탐색을 진행합니다.

2차 탐색은 이미지 유사도를 이용한 탐색으로, 1차 탐색에서 검색할 수 있는 인상착의 정보에 제한이 있기 때문에 추가적으로 도입하게 되었습니다. 탐색 과정에서 입력 이미지의 특징을 뽑아 유사도를 계산하므로 1차 쿼리에 입력되지 않은 추가적인 정보를 더 많이 반영해 탐색을 진행할 것이라고 판단하였습니다. 더 나아가 2차 탐색은 1차 탐색에서 선정된 실종자 추정 이미지 정보를 기반으로 범위와 시간을 재설정  후 진행됩니다. 이를 통해 1차 탐색의 한계를 보완함과 동시에 경찰 인력을 통한 직접 수색 범위를 추가적으로 좁힐 수 있어 본 프로젝트의 목적과 기대 효과에도 잘 맞아 떨어졌습니다.

이미지 유사도 검색의 경우 YOLOv8을 통해 구축된 전신 이미지 데이터셋)에서 쿼리 이미지(보호자가 직접 선별한 이미지)와 유사한 이미지(동일 인물)를 검출해내야 했고, 다른 각도에서 찍힌 사진이더라도 동일 인물인 경우 높은 유사도를 반환해주어야 했습니다. 따라서 대량의 고차원 벡터에서 빠르고 효율적인 유사성 검색 및 클러스터링을 제공하는 Faiss 라이브러리를 사용하였습니다.

Faiss(Facebook AI Similarity Search)는 Meta(前 Facebook AI Research, FAIR)에서 개발한 라이브러리로, 고차원 벡터 데이터의 유사성 검색을 빠르게 수행해줍니다. 우리는 이미지 데이터에 대한 유사성을 계산해야 하므로 ImageNet-1K로 사전 학습된 Swin Transformer V2(SwinV2-L)를 통해 이미지의 특징 벡터를 추출하였습니다.

<div align="center">
    <img src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/ffb53615-c9fa-4f1c-b7d9-4058f648e8ef">
</div>

해당 모델을 통해 추출한 이미지 특징 벡터를 임베딩 벡터로써 각 데이터에 매핑 해주었고, 임베딩 벡터의 빠른 검색 및 클러스터링을 위한 Faiss 인덱스를 생성해주었습니다. 실제로 이후 입력된 쿼리 이미지 또한 동일하게 특징 벡터를 추출해 주었고, 임베딩 된 값들 간의 거리를 계산해 유사한 이미지를 검출해주었습니다.

하지만 유사도가 높은 상위 20개의 이미지를 출력해본 결과 약 3-4개 정도의 동일 인물이 검출되는 것을 확인할 수 있었습니다. GT 값이 존재하지 않는 데이터셋이기 때문에 육안으로 확인한 결과, 텍스트 검색에 기반한 1차 탐색보다 결과가 좋지 않았습니다. 이러한 결과에 대한 원인은 이미지의 특징을 추출하는 모델에 있다고 생각했습니다.

<div align="center">
    <img src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/8b1bcc41-7500-4dfc-ab19-0c8b810f87be">
</div>

현재 사용 중인 특징 추출 모델은 ImageNet-1K로 사전 학습된 모델로 1000개의 클래스에 대한 분류를 학습했던 모델입니다. 따라서 해당 모델을 인상착의에 대한 특징을 잘 추출할 수 있도록, 의류 데이터셋 혹은 전신 인물 데이터셋에 대한 분류를 학습시킨 후 백본 모델로 사용한다면 지금보다 좋은 성능이 나올 거라 기대했습니다. 더 나아가 육안으로 보았을 땐 동일 인물로 판별되더라도, 인물의 배경이 달라질 경우 유사도가 낮게 검출될 것이 우려되었습니다. 이에 실제 inference 단계에서 검색되는 데이터셋과 쿼리 이미지의 배경을 지우고, 인물만 남긴 상태로 유사도 검색을 진행하면 더 좋은 성능을 보일 것이라고 생각했습니다.

<div align="center">
    <img src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/f6035710-29f6-496a-a93d-c41306c05bc0">
</div>

이러한 흐름에 따라 Person Re-Identification 작업을 위해 구축된 “Labeled Pedestrian in the Wild (LPW)” 데이터셋을 준비하였습니다. 해당 데이터셋은 Region-based Quality Estimation Network for Large-scale Person Re-identification (Song et al., 2017)에서 제안된 데이터셋으로, 세 가지의 다른 장면에서 수집된 데이터로 구성되어 있습니다. 첫 번째 장면에서는 세 개의 카메라, 나머지 두 장면에서는 네 개의 카메라를 배치해, 같은 장면에서 촬영된 동일 인물에 대한 각도가 다른 이미지, 배경이 다른 이미지들을 얻을 수 있었습니다.

하지만 현재 사용하고 있는 백본 모델인 SwinV2-L이 많은 연산을 필요로 했기에 로컬이나 구글 코랩 등의 환경에서 학습을 진행하기에는 현실적인 어려움이 있었습니다. 따라서 해당 문제에 대한 개선 가능성을 열어 두고 이미지 유사도 검색 파트를 마무리 짓기로 하였습니다. 