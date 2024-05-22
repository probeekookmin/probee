import styled from "styled-components";
import { useEffect, useState } from "react";
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from "@ant-design/icons";
import SearchStepIcon from "../../assets/icons/searchStepIcon.svg";
import BetweenStepIcon from "../../assets/icons/betweenStepIcon.svg";
import FindStepIcon from "../../assets/icons/findStepIcon.svg";
import { StepContents } from "./StepContents";
export const CustomSteps = ({ currentStep }) => {
  const [current, setCurrent] = useState(0);
  const [view, setView] = useState(0);
  const [tailColor, setTailColor] = useState("#1890FF");
  const [state, setState] = useState("current");

  const iconList = [
    { title: "1차 탐색", icon: SearchStepIcon },
    { title: "이미지 선별", icon: BetweenStepIcon },
    { title: "2차 탐색", icon: SearchStepIcon },
    { title: "실종자 수색", icon: FindStepIcon },
  ];

  useEffect(() => {
    setCurrent(currentStep);
    setView(currentStep);
  }, []);

  const clickItem = (idx) => {
    console.log("clickItem:", idx);
    setView(idx);
  };

  const StepItem = ({ idx }) => {
    return (
      <StepItemContainer onClick={() => clickItem(idx)}>
        <ItemTitleWrapper color={idx > current ? "#A7A7A7" : view == current ? "#1890FF" : "#A9D6FF"}>
          {idx == view ? " " : iconList[idx].title}
        </ItemTitleWrapper>
        {idx != 3 && <StepTail color={idx >= current ? "#E7E7E7" : view == current ? "#1890FF" : "#A9D6FF"}></StepTail>}
        {idx == view ? (
          <IconContainer>
            <IconWrapper color={idx > current ? "#E7E7E7" : "#1890FF"}>
              <img src={iconList[idx].icon} />
            </IconWrapper>
          </IconContainer>
        ) : (
          <IconContainer>
            <DotWrapper color={idx > current ? "#E7E7E7" : view == current ? "#1890FF" : "#A9D6FF"}></DotWrapper>
          </IconContainer>
        )}
      </StepItemContainer>
    );
  };
  return (
    <StCustomSteps>
      <StepsContainer>
        <StepItem idx={0}></StepItem>
        <StepItem idx={1}></StepItem>
        <StepItem idx={2}></StepItem>
        <StepItem idx={3}></StepItem>
      </StepsContainer>
      <StepContentsContainer>
        <StepContents index={view} current={current} />
      </StepContentsContainer>
    </StCustomSteps>
  );
};

const StCustomSteps = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const StepsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const StepItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 22.5rem;
`;
const ItemTitleWrapper = styled.p`
  display: flex;
  text-align: center;
  font-size: 3.75rem;
  font-weight: 500;
  color: ${(props) => props.color || "#1890FF"};
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 26.5rem;
  height: 11.5rem;
`;
const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11.5rem;
  height: 11.5rem;
  margin-top: 1.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.color || "#1890FF"};

  img {
    width: 6rem;
    height: 6rem;
  }
`;
const DotWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${(props) => props.color || "#1890FF"};
`;

const StepTail = styled.div`
  position: absolute;
  margin-top: 4rem;
  margin-left: 22rem;
  width: 22.5rem;
  height: 0.5rem;
  background-color: ${(props) => props.color || "#1890FF"};
`;

const StepContentsContainer = styled.div``;
