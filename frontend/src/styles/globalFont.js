import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import Pretendard_Black from "../assets/fonts/pretendard/Pretendard-Black.woff";
import Pretendard_Bold from "../assets/fonts/pretendard/Pretendard-Bold.woff";
import Pretendard_semiBold from "../assets/fonts/pretendard/Pretendard-SemiBold.woff";
import Pretendard_ExtraBold from "../assets/fonts/pretendard/Pretendard-ExtraBold.woff";
import Pretendard_ExtraLight from "../assets/fonts/pretendard/Pretendard-ExtraLight.woff";
import Pretendard_Light from "../assets/fonts/pretendard/Pretendard-Light.woff";
import Pretendard_Medium from "../assets/fonts/pretendard/Pretendard-Medium.woff";
import Pretendard_Regular from "../assets/fonts/pretendard/Pretendard-Regular.woff";
import Pretendard_Thin from "../assets/fonts/pretendard/Pretendard-Thin.woff";

const GlobalFont = createGlobalStyle`
@font-face {
  font-family: 'Pretendard Black';
  font-weight: 900;
  font-display: swap;
  src: local('Pretendard Black'), url(${Pretendard_Black}) format('woff');
}

@font-face {
  font-family: 'Pretendard ';
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

`;
export default GlobalFont;
