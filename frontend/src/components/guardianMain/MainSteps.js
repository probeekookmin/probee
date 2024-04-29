import { Steps, Avatar } from "antd";
import styled from "styled-components";
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Icon from "@ant-design/icons/lib/components/Icon";

export const MainSteps = ({ currentStep }) => {
  const [current, setCurrent] = useState(0);
  const [view, setView] = useState(0);
  const [state, setState] = useState("current");

  useEffect(() => {
    setCurrent(currentStep);
    setView(currentStep);
  }, []);

  const onChange = (value) => {
    console.log("onChange:", value);
    setView(value);
  };

  const customDot = (dot, { index, title }) => {
    if (view == current) {
      setState("current");
    } else if (view < current) {
      setState("prev");
    } else {
      setState("next");
    }
    return (
      <div onClick={onChange}>
        {index == view ? (
          <div>
            {/* <p>{title}</p> */}
            <IconWrapper state={state}>{iconList[index].icon}</IconWrapper>
          </div>
        ) : (
          // <DotWrapper state={state}></DotWrapper>
          dot
        )}
      </div>
    );
  };

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
      <StepProgress
        className="custom-steps"
        labelPlacement="vertical"
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
const StepProgress = styled(Steps)`
  /* &.custom-steps .ant-steps.ant-steps-dot .ant-steps-item-process .ant-steps-item-icon {
    width: 4rem;
    height: 4rem;
  } */
  margin-top: 4rem;

  &.ant-steps.ant-steps-label-vertical .ant-steps-item {
    width: 100%;
    height: 11.5rem;
    vertical-align: bottom;
  }
  &.ant-steps.ant-steps-dot .ant-steps-item-process .ant-steps-item-icon {
    width: 4rem;
    height: 4rem;
    margin-top: 6.5rem;
  }

  &.ant-steps.ant-steps-dot .ant-steps-item-finish .ant-steps-item-icon {
    margin: 6.5rem;

    width: 4rem;
    height: 4rem;
  }
  &.ant-steps.ant-steps-dot .ant-steps-item-wait .ant-steps-item-icon {
    margin: 6.5rem;

    width: 4rem;
    height: 4rem;
  }

  &.ant-steps .ant-steps-item-tail::after {
    margin-top: 8rem;
    width: calc(100% -2rem);
    height: 0.5rem;
  }
`;

const IconWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  width: 11.5rem;
  height: 11.5rem;
  border-radius: 50%;
  background-color: ${(props) => (props.state == "next" ? "#E7E7E7" : "#1890FF")};
`;
const DotWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${(props) => (props.state == "next" ? "#E7E7E7" : "#1890FF")};
`;
const SharedIcon = `
display: flex;
justify-content: center;
align-items: center;
font-size: 6rem;
color: white;
`;
const Step0Icon = styled(SmileOutlined)`
  ${SharedIcon}
`;
const Step1Icon = styled(SmileOutlined)`
  ${SharedIcon}
`;
const Step2Icon = styled(SolutionOutlined)`
  ${SharedIcon}
`;
const Step3Icon = styled(SolutionOutlined)`
  ${SharedIcon}
`;
const iconList = [{ icon: <Step0Icon /> }, { icon: <Step1Icon /> }, { icon: <Step2Icon /> }, { icon: <Step3Icon /> }];
