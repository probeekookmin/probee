# Pro_bee: 실종자 탐색 시스템

<div align="center"> 
    <p align = "center">
    <img src = "https://github.com/kookmin-sw/capstone-2024-14/assets/95959567/4908a921-997c-433c-a9ee-56238ef01525" width = "30%"/>
    </p>
    <p align = "center">
    <a href = "https://probee.co.kr"> Pro-bee </a>
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

<div align="center"> 
    <p align = "center">
    <img src = "https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/862268e3-74b1-4fc9-93f9-a67953c64f24">
    </p>
</div>

```
**인공지능을 활용한 실종자 탐색 서비스**
```

본 프로젝트, Pro_bee는 실종 신고가 접수되었을 때 인공지능을 활용하여 CCTV 영상을 분석하고, 수색 범위를 좁혀 골든타임을 확보하는 것이 목표입니다.

Pro_bee의 이용자는 경찰과 보호자, 둘로 나뉩니다. 경찰은 관리자 화면을 통해 실종자 정보, CCTV 영상 분석 정보, 실종자 탐색 단계를 확인할 수 있습니다. 경찰은 인공지능을 활용한 탐색 결과를 바탕으로 현장 수색을 나감으로써, 한정된 인력을 효율적으로 활용할 수 있습니다. 보호자는 실종자와 유사한 이미지를 선별하는 과정을 통해 AI 실종자 탐색 프로세스에 참여, 실종자 탐색에 도움을 주게 됩니다. 또한 보호자 화면을 통해 실시간으로 진행 현황을 확인할 수 있어서, 실종자 수색 중 보호자의 불안감을 낮출 수 있을 것으로 기대됩니다.

Pro_bee는 실종 경보 문자를 대체하고, 실종자 탐색 과정의 일부를 인공지능으로 대체함으로써 잦은 재난 문자로 인한 시민들의 피로감을 낮추고, 실종자 수색이 빠르고 효율적으로 이루어질 수 있도록 합니다.

## Abstract

```
**Missing Person Search Service by using AI**
```

The project "Pro_bee" aims to utilize artificial intelligence to analyze CCTV footage and narrow down the search area when a missing person report is received, thus securing the golden time for finding the missing person.

The users of Pro_bee are divided into police officers and guardians. The police can use the administrator interface to check the information on the missing person, CCTV video analysis data, and the stages of the search. By relying on AI-based search results, the police can conduct field searches more effectively, making efficient use of their limited manpower. Guardians participate in the AI search process by selecting images that resemble the missing person, thereby assisting in the search. Additionally, guardians can monitor the progress in real-time through their interface, which is expected to reduce their anxiety during the search process.

Pro_bee replaces the need for missing person alert messages and automates parts of the search process with artificial intelligence. This reduces the fatigue caused by frequent disaster alerts among citizens and ensures that the search for missing persons is conducted more quickly and efficiently.

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
