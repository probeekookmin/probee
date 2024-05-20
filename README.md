# Pro_bee: 실종자 탐색 시스템

<div align="center"> 
    <p align = "center">
        <a href="https://probee.co.kr">
            <img src = "https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/6e0d2476-00d8-4e0e-bd3e-59d899a0af87" width = "30%"/>
        </a>
    </p>
</div>

<div>
    <p align = "center" style="line-height: 2;">
        <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> 
        <img src="https://img.shields.io/badge/antdesign-0170FE?style=for-the-badge&logo=antdesign&logoColor=white"> 
        <br/>
        <img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white"> 
        <img src="https://img.shields.io/badge/fastapi-009688?style=for-the-badge&logo=fastapi&logoColor=white"> 
        <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"> 
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

1. 🚨 [프로젝트 소개](#-프로젝트-소개)
2. 💻 [주요 기능](#-주요-기능)
3. 🎬 [소개 영상](#-소개-영상)
4. 🔎 [페이지 안내](#-페이지-안내)
5. 👨‍💻 [팀원 소개](#-팀원-소개)
6. 📢 [시스템 구조도](#-시스템-구조도)
7. 🎯 [작업 방식](#-작업-방식)
8. ✨ [기대 효과](#-기대-효과)
9. 📝 [관련 문서](#-관련-문서)

<br/>

## 🚨 프로젝트 소개

<div align="center"> 
    <p align = "center">
    <img src = "https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/8c6823b7-e9e1-4880-a453-382fac53e87c" width = "70%"/>
    </p>
</div>

```
인공지능을 활용한 실종자 탐색 서비스
```

본 프로젝트, Pro_bee는 실종 신고가 접수되었을 때 인공지능을 활용하여 CCTV 영상을 분석하고, 수색 범위를 좁혀 골든타임을 확보하는 것이 목표입니다.

Pro_bee의 이용자는 경찰과 보호자, 둘로 나뉩니다. 경찰은 관리자 화면을 통해 실종자 정보, CCTV 영상 분석 정보, 실종자 탐색 단계를 확인할 수 있습니다. 경찰은 인공지능을 활용한 탐색 결과를 바탕으로 현장 수색을 나감으로써, 한정된 인력을 효율적으로 활용할 수 있습니다. 보호자는 실종자와 유사한 이미지를 선별하는 과정을 통해 AI 실종자 탐색 프로세스에 참여, 실종자 탐색에 도움을 주게 됩니다. 또한 보호자 화면을 통해 실시간으로 진행 현황을 확인할 수 있어서, 실종자 수색 중 보호자의 불안감을 낮출 수 있을 것으로 기대됩니다.

Pro_bee는 실종 경보 문자를 대체하고, 실종자 탐색 과정의 일부를 인공지능으로 대체함으로써 잦은 재난 문자로 인한 시민들의 피로감을 낮추고, 실종자 수색이 빠르고 효율적으로 이루어질 수 있도록 합니다.

<br/>

## 👋 Abstract

```
Missing Person Search Service by using AI
```

The project, "Pro_bee", aims to utilize artificial intelligence to analyze CCTV footage and narrow down the search area when a missing person report is received, thus securing the golden time for finding the missing person.

The users of Pro_bee are divided into police officers and guardians. The police can use the administrator interface to check the information on the missing person, CCTV video analysis data, and the stages of the search. By relying on AI-based search results, the police can conduct field searches more effectively, making efficient use of their limited manpower. Guardians participate in the AI search process by selecting images that resemble the missing person, thereby assisting in the search. Additionally, guardians can monitor the progress in real-time through their interface, which is expected to reduce their anxiety during the search process.

Pro_bee replaces the need for missing person alert messages and automates parts of the search process with artificial intelligence. This reduces the fatigue caused by frequent disaster alerts among citizens and ensures that the search for missing persons is conducted more quickly and efficiently.

<br/>

## 💻 주요 기능

### 인공지능을 활용한 두 단계 탐색 👀
실종자의 성별, 나이, 인상착의 등의 텍스트 정보를 바탕으로 1차 탐색을 진행한 후, 보호자에 의해 선택된 이미지에 대하여 이미지와 유사한 사람을 찾는 2차 탐색을 진행합니다.

### 실종자 탐색 프로세스에서의 보호자 참여 🤚
텍스트 정보를 바탕으로 찾은 결과에 대해 보호자의 확인을 거칩니다. 보호자는 결과 이미지 중 실종자와 유사하다고 판단되는 이미지를 선택하여 제출합니다. 해당 선택을 바탕으로 2차 탐색이 진행됩니다.

<br/>

## 🎬 소개 영상

*해당 위치에 영상 첨부*

<br/>

## 🔎 페이지 안내

### 경찰 측 화면 💻
#### 실종 정보 등록
<div align="center">
    <img width="80%" alt="실종 정보등록" src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/abbd53e2-7d0b-403d-9cec-62fb2af6c993">
</div>

#### 실종자 리포트 (메인)
<div align="center">
        <img width="80%" alt="실종자 리포트 1" src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/d4859ef0-a908-4616-ac7a-30e087028db5">
</div>
<br/>
<div align="center">
        <img width="80%" alt="실종자 리포트 2" src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/1cee4599-6377-47f0-9ab1-7e879cb8d18a">
</div>

#### 실종자 리포트 (지능형 탐색)
<div align="center">
        <img width="80%" alt="지능형탐색" src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/6d9f3173-10c0-4b42-8b71-00a76049f66c">
</div>

### 보호자 측 화면 📱
<div align="center">
        <img width="80%" alt="보호자 화면 플로우" src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/40c77f16-45ec-44f8-a98f-4821ac991256">
</div>
<br/>
<div align="center">
        <img width="80%" alt="보호자 화면 설명" src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/1710fa24-b461-4fbe-9105-ee36d5421492">
</div>

<br/>

## 👨‍💻 팀원 소개

<div style="overflow-x: auto;">
    <table style="width: auto; min-width: 800px;">
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
                  <b>정수환</b>
                </a> 
                <br/>
                  ****1663
            </td>
            <td style="min-width: 150px;">
                <a href="https://github.com/chaews0327">
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
                <span style="font-size: 12px;">chaews0327@gmail.com</span>
            </td>
            <td>
                <span style="font-size: 12px;">tory912@gmail.com</span>
            </td>
        </tr>
    </table>
</div>

<br/>

## 📢 시스템 구조도

### 시스템 아키텍처
<div align="center">
    <img width="90%" alt="스크린샷 2024-03-28 오후 10 39 48" src="https://github.com/kookmin-sw/capstone-2024-14/assets/95959567/1dce6e6b-d384-4f5f-aa12-a23d9f028871">
</div>

<br/>

### ERD
<div align="center">
    <img width="90%" alt="스크린샷 2024-03-28 오후 10 39 48" src="https://github.com/kookmin-sw/capstone-2024-14/assets/95959567/3598f3c2-176b-463d-867a-b4c10b226b04">
</div>

<br/>

## 🎯 작업 방식
Github의 Issue와 Pull Request 기능을 사용하여 작업을 진행하였습니다.
<div align="center">
    <img width="70%" alt="작업 방식" src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/b7eebea4-8fbd-40b8-84d8-fdb5f401d3b2">
</div>

<br/>

## ✨ 기대 효과
### 1️⃣ 보호자의 불안감 감소 
보호자는 별도의 경찰 연락 없이도 웹사이트 접속을 통해 실시간으로 진행 상황을 확인할 수 있습니다. 
### 2️⃣ 정확한 실종자 탐색 결과
인상착의 등의 텍스트 기반으로 1차 탐색을 수행한 후, 이미지 기반으로 2차 탐색을 진행함으로써 보다 정확한 탐색이 이루어집니다.
### 3️⃣ 경찰 인력의 효율적 활용
실종자의 가장 최근 위치를 확보하고, 수색 범위를 줄임으로써 한정된 경찰 인력을 효율적으로 활용할 수 있습니다.
### 4️⃣ 재난 경보 문자에 대한 시민 피로도 감소
재난 경보 문자에서 실종 경보 문자가 제외됨에 따라 재난 경보 문자에 대한 시민들의 피로도가 감소합니다.

<br/>

## 📝 관련 문서

### [중간 발표 자료](https://kookmin-my.sharepoint.com/:p:/g/personal/nobin313_kookmin_kr/EZ_YMHrscrpDqi5o711oQ9QBP5tPv9sapmubxHwY3E2wrg?e=dj1BnF)
### [중간 보고서](https://kookmin-my.sharepoint.com/:w:/g/personal/zw0831_kookmin_kr/ERG14OVbsiJMmz-SfXfTwdYBdc5kyoi-3pCWefmoeRXrlQ?e=AIOAVe)
### 시연 동영상
### 포스터
### [최종 발표 자료](https://kookmin-my.sharepoint.com/:p:/g/personal/nobin313_kookmin_kr/EYE8CAkp8dtJoZCEUD7ouS0BLVE5dqfoT0zpGGJcZOGsqQ?e=xJ3ThE)
### [결과 보고서](https://kookmin-my.sharepoint.com/:w:/g/personal/nobin313_kookmin_kr/ET0PsewLTgxPr8nzA-LSBrUBYQofkCpti-cj9dpEHLhjeg?e=wuc5Cv)
### [회의록](https://outrageous-drain-ebf.notion.site/e42ffda04f7247c18e11fde61b708b2d?v=a912ec3c266b4c2ea34b87394df1c945&pvs=74)