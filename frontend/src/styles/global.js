import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  html { font-size: 62.5%; }
  @media all and (max-width: 750px) {
  html { font-size: 50%; } // 이제 문서 내 모든 rem 단위가 영향을 받습니다.
}

  * {
    box-sizing: border-box;
	}

  button:hover {
    cursor: pointer;
  }
`;

export default GlobalStyle;
