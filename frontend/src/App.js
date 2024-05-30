import "./App.css";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./styles/global";
// import Router from "./core/router";
import { ConfigProvider } from "antd";
import Router from "./core/router";

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
        {/* <Router /> */}
        <Router />
      </ConfigProvider>
    </RecoilRoot>
  );
}

export default App;
