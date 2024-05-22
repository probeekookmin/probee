import "./App.css";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./styles/global";
import Router from "./core/router";
import { ConfigProvider } from "antd";

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Prentendard",
          },
        }}>
        <Router />
      </ConfigProvider>
    </RecoilRoot>
  );
}

export default App;
