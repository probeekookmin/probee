import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* :root{
    --vh: 100%;
  } */
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
	}
  a {
    text-decoration: none;
    color: inherit;
  }
 




  button:hover {
    cursor: pointer;
  }
`;

export default GlobalStyle;
