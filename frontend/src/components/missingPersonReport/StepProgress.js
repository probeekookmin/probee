import { useState } from "react";
import styled from "styled-components";
import { Steps, Typography } from "antd";

export const StepProgress = () => {
  const [current, setCurrent] = useState(0);
  const description = "This is a description.";
  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };
  return (
    <StStepProgress>
      <Typography.Title level={5}>현황</Typography.Title>
      <Steps
        direction="vertical"
        current={current}
        onChange={onChange}
        items={[
          {
            title: "정보 등록",
          },
          {
            title: "1차 탐색",
            description,
          },
          {
            title: "이미지 선별",
            description,
          },
          {
            title: "2차 탐색",
            description,
          },
          {
            title: "수색",
            description,
          },
          {
            title: "종료",
          },
        ]}></Steps>
    </StStepProgress>
  );
};

const StStepProgress = styled.div`
  height: 43rem;

  padding: 1rem 0.63rem;

  gap: 1.25rem;
  border-radius: 0.3rem;
  background-color: white;
`;
