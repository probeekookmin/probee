import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import GlobalFont from "./globalFont";
import Pretendard_Black from "../assets/fonts/pretendard/Pretendard-Black.woff";
import Pretendard_Bold from "../assets/fonts/pretendard/Pretendard-Bold.woff";
import Pretendard_semiBold from "../assets/fonts/pretendard/Pretendard-SemiBold.woff";
import Pretendard_ExtraBold from "../assets/fonts/pretendard/Pretendard-ExtraBold.woff";
import Pretendard_ExtraLight from "../assets/fonts/pretendard/Pretendard-ExtraLight.woff";
import Pretendard_Light from "../assets/fonts/pretendard/Pretendard-Light.woff";
import Pretendard_Medium from "../assets/fonts/pretendard/Pretendard-Medium.woff";
import Pretendard_Regular from "../assets/fonts/pretendard/Pretendard-Regular.woff";
import Pretendard_Thin from "../assets/fonts/pretendard/Pretendard-Thin.woff";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Pretendard Black';
  font-weight: 900;
  font-display: swap;
  src: local('Pretendard Black'), url(${Pretendard_Black}) format('woff');
}

@font-face {
  font-family: 'Pretendard ExtraBold';
  font-weight: 800;
  font-display: swap;
  src: local('Pretendard ExtraBold'),
  url(${Pretendard_ExtraBold}) format('woff');
}

@font-face {
    font-family:'Pretendard';
    font-weight:700;
    font-display:swap;
    src:local('Pretendard Bold'), url(${Pretendard_Bold}) format("woff");
  }

  @font-face {
    font-family:'Pretendard';
    font-weight:600;
    font-display:swap;
    src:local('Pretendard SemiBold'), url(${Pretendard_semiBold}) format("woff");
  }

  @font-face {
    font-family:'Pretendard';
    font-weight:500;
    font-display:swap;
    src:local('Pretendard Medium'), url(${Pretendard_Medium}) format("woff")
  }
  @font-face {
    font-family:'Pretendard';
    font-weight:400;
    font-display:swap;
    src:local('Pretendard Regular'), url(${Pretendard_Regular}) format("woff")
  }
  @font-face {
	font-family: 'Pretendard';
	font-weight: 300;
	font-display: swap;
	src: local('Pretendard Light'),url(${Pretendard_Light}) format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 200;
	font-display: swap;
	src: local('Pretendard ExtraLight'), url(${Pretendard_ExtraLight}) format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 100;
	font-display: swap;
	src: local('Pretendard Thin'),url(${Pretendard_Thin}) format('woff');
}
  ${reset}
  html { font-size: 62.5%; }
  @media all and (max-width: 750px) {
  html { font-size: 50%; 
  width:100vw;
  height: 100vh; 
  /* 혹시나 Custom Property 지원 안하는 브라우저를 위한 복귀점(Fallback) */
  height: calc(var(--vh, 1vh) * 100);} 
  // 이제 문서 내 모든 rem 단위가 영향을 받습니다.
}



  * {
    box-sizing: border-box;
    font-family : "Pretendard";
	}
  body{font-family: "Pretendard";}

  button:hover {
    cursor: pointer;
  }
  
`;

export default GlobalStyle;
