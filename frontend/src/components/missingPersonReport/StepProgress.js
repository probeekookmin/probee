import { useState } from "react";
import styled from "styled-components";
import { Steps, Typography } from "antd";
import { useEffect } from "react";
export const StepProgress = ({ step }) => {
  const [current, setCurrent] = useState(0);
  const description = "This is a description.";
  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };
  useEffect(() => {
    console.log("step", step);
    setCurrent(step);
  }, [step]);

  return (
    <StStepProgress>
      <Title>현황</Title>
      <Step
        className="custom-steps"
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
        ]}></Step>
    </StStepProgress>
  );
};

const StStepProgress = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 20rem;
  height: 100%;

  padding: 1.5rem;

  gap: 1.5rem;
  border-radius: 0.4rem;
  background-color: rgba(255, 255, 255, 0.9);
`;

const Title = styled.p`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
  @media all and (max-width: 1536px) {
    font-size: 1.4rem;
  }
`;

const Step = styled(Steps)`
  @media all and (max-width: 1536px) {
    &.ant-steps .ant-steps-item-icon {
      width: 2.4rem;
      height: 2.4rem;
      font-size: 1.2rem;
      span {
        top: -0.4rem;
      }
    }
    &.ant-steps .ant-steps-item-title {
      font-size: 1.4rem;
    }
    &.ant-steps .ant-steps-item-description {
      font-size: 1.2rem;
    }
  }
`;
