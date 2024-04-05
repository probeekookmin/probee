# Pro_bee

<div align="center"> 
    <p align = "center">
    <img src = "https://github.com/kookmin-sw/capstone-2024-14/assets/95959567/4908a921-997c-433c-a9ee-56238ef01525" width = "30%"/>
    </p>
    <h3 align="center"> Pro-bee </h3>

</div>

<div>
<p align = "center" style="line-height: 2;">
  <img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white"> 
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> 
  <img src="https://img.shields.io/badge/antdesign-0170FE?style=for-the-badge&logo=antdesign&logoColor=white"> 
  <br/>
  <img src="https://img.shields.io/badge/pytorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white"> 
  <img src="https://img.shields.io/badge/Open Cv-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white"> 
  <br/>
  <img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"> 
  <img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white"> 
  <img src="https://img.shields.io/badge/amazon S3-6DB33F?style=for-the-badge&logo=amazons3&logoColor=white"> 
  <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white"> 
  <br/>
  <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> 
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> 
  <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white"> 
  <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"> 
</p>
</div>

## 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [주요기능](#주요기능)
3. [소개영상](#소개영상)
4. [디자인](#디자인)
5. [팀원소개](#팀원-소개)
6. [시스템 구조도](#시스템-구조도)
7. [작업방식](#작업방식)
8. [기대효과](#기대효과)
9. [관련문서](#관련문서)

## 프로젝트 소개

프로젝트(이하, Pro_bee)의 목표는 실종자 인상착의 정보를 통해 CCTV에서 유사한 인물을 찾아내는, 지능형 실종자 탐색 시스템의 제작입니다.

Pro_bee는 실종 경보 문자를 줄임과 동시에 시민 제보를 대체할 수단을 찾고자 하는 곳에서 시작했습니다.

경보 문자에서 활용되던 정보(인상착의, 나이, 성별, 사진 등)을 활용한 지능형 실종자 검출 시스템을 기획하였습니다. 좀 더 세부적으로는 시민 제보를 통하지 않고도 실종자 검출 효과를 증대 시킬 수 있는 메커니즘을 개발, 사람이 아닌 AI에 의한 1차 탐색을 도입해 직접적 탐색 범위를 줄여 한정된 경찰 인력이 효율적 운영되도록 함을 목표로 하였습니다.

이번 프로젝트의 이용 타겟층은 행정기관(이하, 경찰로 한정)과 실종자의 보호자(이하, 의뢰인)로 정의 내렸으며, 각종 지자체에서 도입하고 있는 지능형 CCTV와의 차별점을 두기 위해 이용자 간의 상호작용이 가능한 웹 시스템을 추가 구축하였습니다. 이용자 간의 빠르고 신속한 정보 공유가 가능해지도록 함으로써, 탐색 과정을 효율적으로 단축시키고 의뢰인의 불안을 낮춰주는 효과를 내고자 하였습니다.

([중간 보고서](https://kookmin-my.sharepoint.com/:w:/g/personal/zw0831_kookmin_kr/ERG14OVbsiJMmz-SfXfTwdYBdc5kyoi-3pCWefmoeRXrlQ?e=xKc0jb) 발췌)

## Abstract

The goal of the project, Pro_bee, is to develop an intelligent missing person search system that identifies similar individuals from CCTV footage based on the characteristics of the missing person's appearance.

Pro_bee originated from the need to reduce missing person alerts and find alternatives to citizen reports. We planned an intelligent missing person detection system utilizing information commonly found in missing person alerts such as physical descriptions, age, gender, and photographs. Specifically, our aim was to enhance the effectiveness of missing person detection without relying solely on citizen reports by introducing a mechanism for AI-driven initial search, thereby reducing the direct search range and enabling efficient utilization of limited police resources.

The target users of this project are governmental institutions, specifically law enforcement agencies (referred to as the police), and the guardians of missing persons (referred to as clients). To differentiate from intelligent CCTV systems adopted by various local governments, we additionally developed a web system facilitating interaction among users. By enabling rapid and efficient information sharing among users, we aimed to streamline the search process and alleviate the anxieties of the clients.

## 주요기능

-   인공지능을 활용한 CCTV 영상 분석
-   의뢰인과의 상호작용

## 소개영상

## 디자인

-   실종자 리포트
<div align="center">
        <img width="80%" alt="실종자 리포트" src="https://github.com/kookmin-sw/capstone-2024-14/assets/95959567/4b41769c-05bb-4fff-afbb-b1cf42d2b44f">
</div>
<br/>

-   지능형탐색
<div align="center">
        <img width="80%" alt="지능형탐색" src="https://github.com/kookmin-sw/capstone-2024-14/assets/95959567/adcbf567-e373-4c27-984a-77401de75420">
</div>
<br/>

-   실종 정보 등록
<div align="center">
<img width="80%" alt="실종 정보등록" src="https://github.com/kookmin-sw/capstone-2024-14/assets/95959567/8ad7de72-2e4d-4ef7-9b4a-6fdb8901ea23">
</div>
<br/>

-   보호자 회면
<div align="center">
        <img width="40%" alt="스크린샷 2024-03-30 오후 8 22 46" src="https://github.com/kookmin-sw/capstone-2024-14/assets/95959567/a8291324-981c-40ba-8654-8caa9c29938c">
</div>

## 팀원 소개

<table>
    <tr align="center">
        <td style="min-width: 150px;">
            <a href="https://github.com/begong313">
              <img src="https://avatars.githubusercontent.com/u/95959567?v=4" width="80">
              <br />
              <b>노종빈</b>
            </a> 
            <br/>
              ****0891
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/KJW988">
              <img src="https://avatars.githubusercontent.com/u/71117552?v=4" width="80">
              <br />
              <b>김지원</b>
            </a>
                       <br/>
              ****0812
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/su-hwani">
              <img src="https://avatars.githubusercontent.com/u/54920289?v=4" width="80">
              <br />
              <b>정수환 </b>
            </a> 
                       <br/>
              ****1663
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/mirageciel">
              <img src="https://avatars.githubusercontent.com/u/84088060?v=4" width="80">
              <br />
              <b>신채원</b>
            </a> 
                       <br/>
              ****3021
        </td>
                <td style="min-width: 150px;">
            <a href="https://github.com/ancy0">
              <img src="https://avatars.githubusercontent.com/u/84322890?v=4" width="80">
              <br />
              <b>안채영</b>
            </a> 
                       <br/>
              ****3024 
        </td>
    </tr>
    <tr align="center">
        <td>
            팀장, Backend
        </td>
        <td>
            AI
        </td>
        <td>
            Backend
        </td>
                <td>
            AI
        </td>
                <td>
            Frontend
        </td>
    </tr>
    <tr align="center">
        <td>
            <span style="font-size: 12px;">nobin313@kookmin.ac.kr</span>
        </td>
        <td>
            <span style="font-size: 12px;">livelim313@gmail.com</span>
        </td>
        <td>
            <span style="font-size: 12px;">wjdtnghks123@kookmin.ac.kr</span>
        </td>
                <td>
            <span style="font-size: 12px;">mirageciel@kookmin.ac.kr</span>
        </td>
                <td>
            <span style="font-size: 12px;">tory912@gmail.com</span>
        </td>
    </tr>
</table>

## 시스템 구조도

-   시스템 아키텍처
<div align="center">
<img width="90%" alt="스크린샷 2024-03-28 오후 10 39 48" src="https://github.com/kookmin-sw/capstone-2024-14/assets/95959567/1dce6e6b-d384-4f5f-aa12-a23d9f028871">
</div>
<br/>

-   ERD
<div align="center">
<img width="90%" alt="스크린샷 2024-03-28 오후 10 39 48" src="https://github.com/kookmin-sw/capstone-2024-14/assets/95959567/3598f3c2-176b-463d-867a-b4c10b226b04">
</div>

## 작업방식

## 기대효과

## 관련문서

### 중간 발표자료

<div style="display: flex; justify-content: center; align-items: center;">
    <a align = "center" href = "https://kookmin-my.sharepoint.com/:p:/g/personal/nobin313_kookmin_kr/EZ_YMHrscrpDqi5o711oQ9QBP5tPv9sapmubxHwY3E2wrg?e=dj1BnF">
    <img src = "https://github.com/kookmin-sw/capstone-2024-14/assets/95959567/45b5fbdb-6789-49d5-88b0-24ad95240fb3" alt = "middlePPT" width="80%">
    </a>
    
</div>

### 중간 보고서

-   [중간보고서](https://kookmin-my.sharepoint.com/:w:/g/personal/zw0831_kookmin_kr/ERG14OVbsiJMmz-SfXfTwdYBdc5kyoi-3pCWefmoeRXrlQ?e=AIOAVe)
-   [회의록](https://outrageous-drain-ebf.notion.site/e42ffda04f7247c18e11fde61b708b2d?v=a912ec3c266b4c2ea34b87394df1c945&pvs=74)
