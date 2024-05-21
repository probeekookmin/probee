import styled from "styled-components";
import { useState, useEffect } from "react";
import { Steps, Typography } from "antd";

export const StepProgress = ({ step, stepDetail }) => {
  const [current, setCurrent] = useState(0);
  const [detail, setDetail] = useState("");
  const description = "This is a description.";
  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };
  useEffect(() => {
    console.log("step", step);
    setCurrent(step);
    if (step === 1 || step === 3) {
      setDetail(stepDetail);
    }
  }, [step]);

  return (
    <StStepProgress>
      <Title>현황</Title>
      <Step
        className="custom-steps"
        direction="vertical"
        current={current}
        // onChange={onChange}
        items={[
          {
            title: "정보 등록",
          },
          {
            title: "1차 탐색",
            description: current === 1 ? detail : "",
          },
          {
            title: "이미지 선별",
          },
          {
            title: "2차 탐색",
            description: current === 3 ? detail : "",
          },
          {
            title: "수색",
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

  border-radius: 0.4rem;
  background-color: rgba(255, 255, 255, 0.9);
  @media all and (max-width: 1536px) {
    padding: 1rem 1.5rem;
  }
`;

const Title = styled.p`
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: 1.6rem;
  font-weight: 600;
  @media all and (max-width: 1536px) {
    margin-bottom: 1rem;

    font-size: 1.4rem;
  }
`;

const Step = styled(Steps)`
  @media all and (min-width: 1680px) {
    &.ant-steps .ant-steps-item-icon {
      width: 3.2rem;
      height: 3.2rem;
      /* font-size: 1.2rem;
    span {
      top: -0.4rem;
    } */
    }
    &.ant-steps .ant-steps-item-title {
      font-size: 1.6rem;
    }
    &.ant-steps .ant-steps-item-description {
      font-size: 1.2rem;
    }
  }

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
      font-size: 1.1rem;
    }
    &.ant-steps.ant-steps-vertical > .ant-steps-item > .ant-steps-item-container > .ant-steps-item-tail {
      left: 1rem;
      padding: 3rem 0 0.6rem;
    }
  }
  @media all and (max-width: 1300px) {
    &.ant-steps .ant-steps-item-icon {
      width: 2rem;
      height: 2rem;
      font-size: 1rem;
      span {
        top: -0.6rem;
      }
    }
    &.ant-steps .ant-steps-item-title {
      font-size: 1.2rem;
    }
    &.ant-steps .ant-steps-item-description {
      font-size: 1rem;
    }
  }
`;
