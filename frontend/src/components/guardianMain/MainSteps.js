import { Steps, Avatar } from "antd";
import styled from "styled-components";
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";

const iconList = [
  { icon: <SmileOutlined /> },
  { icon: <SolutionOutlined /> },
  { icon: <LoadingOutlined /> },
  { icon: <UserOutlined /> },
];

export const MainSteps = () => {
  const [current, setCurrent] = useState(0);
  const [view, setView] = useState(0);
  const [viewStatus, setViewStatus] = useState("process");
  const onChange = (value) => {
    console.log("onChange:", value);
    setView(value);
  };

  const customDot = (dot, { index }) => <> {index != view ? dot : customIcon(iconList[index].icon, index)}</>;

  const customIcon = ({ icon, index }) => {
    if (current == index) {
      return <Avatar icon={icon} />;
    } else if (current < index) {
      return (
        <Avatar
          size={{
            xs: 24,
            sm: 32,
            md: 40,
            lg: 64,
            xl: 80,
            xxl: 100,
          }}
          icon={icon}
        />
      );
    }
  };
  return (
    <StMainSteps>
      <Steps
        progressDot={customDot}
        current={current}
        onChange={onChange}
        items={[
          {
            title: "1차 탐색",
          },
          {
            title: "탐색 이미지 선별",
          },
          {
            title: "2차 탐색",
          },
          {
            title: "실종자 수색",
          },
        ]}
      />
    </StMainSteps>
  );
};

const StMainSteps = styled.div``;
