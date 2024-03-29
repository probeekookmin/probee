# Pro_bee

<div align="center"> 
<p align = "center">
<img src = "https://github.com/kookmin-sw/capstone-2024-14/assets/95959567/4908a921-997c-433c-a9ee-56238ef01525" width = "30%"/>
</br>
<a href = "https://probee.co.kr">Pro-bee<a>
</p>
  <img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white"> 
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> 
  <br/>
  <img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"> 
  <img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white"> 
  <img src="https://img.shields.io/badge/amazon S3-6DB33F?style=for-the-badge&logo=amazons3&logoColor=white"> 
  <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white"> 
  <br/>
  <img src="https://img.shields.io/badge/pytorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white"> 
</div>

## 1. 프로젝트 소개

프로젝트(이하, Pro_bee)의 목표는 실종자 인상착의 정보(text)를 통해 CCTV에서 유사한 인물을 찾아내는, 지능형 실종자 검출 시스템을 만드는 것이다.

해당 프로젝트는 아래와 같은 이유로 기획되었다.

실종자 경보 문자(이하, 경보 문자)는 실종 사건 발생 시 국민 제보를 활성화하고자 생겨난 제도로, 문자를 받은 시민의 제보를 수사에 활용한다. 이를 통해 발견 시간이 7분의 1로 단축되기도 하는 등 경보 문자는 실제 실종자 수사 과정에 도움을 주고 있다.

하지만 이러한 긍정적 효과에도 불구하고 경보 문자의 한계는 명확하다. 경찰 관계자 및 전문가들은 지속되는 경보 문자로 인해 시민들의 피로도가 쌓일 경우 오히려 효용 가치가 떨어질 수 있다며 시스템 개선을 촉구했으며, 이윤호 동국대 경찰행정학과 교수는 "소위 양치기소년 효과(경보가 반복되면 그 신뢰성이 떨어지는 현상)처럼 실종경보가 자주 반복될 경우 시민들의 호응도가 낮아질 수 있다"는 의견을 밝혔다.

Pro_bee는 경보 문자에서 활용되던 정보(인상착의, 나이, 성별, 사진 등)을 활용한 지능형 실종자 검출 시스템을 기획하였다.
좀 더 세부적으로는 시민 제보를 통하지 않고도 실종자 검출 효과를 증대 시킬 수 있는 메커니즘을 개발해 시민 피로도를 낮추고자 하였고, 사람이 아닌 AI에 의한 1차 탐색을 도입해 경찰의 직접적 탐색 범위를 줄여 한정된 경찰 인력을 효율적으로 운영하고자 하였다.

이번 프로젝트의 이용 타겟층은 행정기관(이하, 경찰로 한정)과 실종자의 보호자(이하, 의뢰인)로 정의 내렸으며, 각종 지자체에서 도입하고 있는 지능형 CCTV와의 차별점을 두기 위해 이용자 간의 `상호작용` 이 가능하도록 시스템을 구축하였다. 이용자 간의 빠르고 신속한 정보 공유가 가능해지도록 함으로써, 탐색 과정을 효율적으로 단축시키고 의뢰인의 불안을 낮춰주는 효과를 기대하고 있다.

## 2. 소개 영상, 사진

### 시스템 아키텍처

<div align="center">
<img width="80%" alt="스크린샷 2024-03-28 오후 10 39 48" src="https://github.com/kookmin-sw/capstone-2024-14/assets/95959567/1be85776-331d-4d50-9cbd-1d9e4537dfad">
</div>

### 중간 발표자료

[<div align="center"><img width="80%" alt="스크린샷 2024-03-28 오후 10 39 48" src="https://github.com/kookmin-sw/capstone-2024-14/assets/95959567/abe635fc-ec90-448e-ab06-08ab8cedf3b9"></div>](https://kookmin-my.sharepoint.com/:p:/g/personal/nobin313_kookmin_kr/ET2mxYSGOAdEmxKkdSXwADgBDvvcNR_HiPlutb_c9Adb4Q?e=llzu09)

## 3. 팀 소개

```
Name : 노종빈(팀장)
ID : 20180891
Email : nobin313@kookmin.ac.kr
github: https://github.com/begong313
Role:
 - Backend
 - CCTV 개발
```

```
Name : 김지원
ID : 20180812
Email : livelim313@gmail.com
github : https://github.com/KJW988
Role:
 - AI
 - Yolo
```

```
Name : 정수환
ID : 20191663
Email : wjdtnghks123@kookmin.ac.kr
github : https://github.com/su-hwani

Role:
 - Backend
 - AWS
```

```
Name : 신채원
ID : 20213021
Email : mirageciel@kookmin.ac.kr
github : https://github.com/mirageciel
Role:
 - AI
```

```
Name : 안채영
ID : 20213024
Email : tory912@gmail.com
github : https://github.com/ancy0
Role:
 - Frontend
 - 디자인
```

## 4. 사용법

추후 업로드 예정

## 5. 기타

추가적인 내용은 자유롭게 작성하세요.
