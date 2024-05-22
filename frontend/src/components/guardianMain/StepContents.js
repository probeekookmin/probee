import { Button, Typography } from "antd";
import { warnContext } from "antd/es/config-provider";
import styled from "styled-components";
import { RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

/*
    StepContentsList: 탐색 단계별 내용
    - title: 탐색 단계 제목
    - content: 탐색 단계 내용
    - buttonText: 버튼 텍스트
    - callBack: 버튼 클릭 시 실행할 함수

    wait, process, finish

 */

export const StepContents = ({ index, current }) => {
  const StepContentsList = [
    {
      step: 0,
      title: "1차 탐색",
      wait: { content: "지능형 탐색을 시작합니다." },
      process: { content: "등록된 정보로 지능형 탐색 중입니다." },
      finish: {
        content: "탐색 완료했습니다.",
        buttonText: "탐색 결과 확인하기",
        callBack: () => {
          navigate("/result", { state: { title: "1차 탐색 결과", step: "first" } });
        },
      },
    },
    {
      step: 1,
      title: "탐색 이미지 선별",
      wait: {
        content:
          "1차 탐색 결과 이미지 중 실종자와 유사한 이미지를 선택해주세요. 선택된 이미지는 2차 탐색에 활용되니 신중한 선택 부탁드립니다.",
      },
      process: {
        content:
          "1차 탐색 결과 이미지 중 실종자와 유사한 이미지를 선택해주세요. 선택된 이미지는 2차 탐색에 활용되니 신중한 선택 부탁드립니다.",
        buttonText: "이미지 선별하기",
        callBack: () => {
          navigate("/select");
        },
      },
      finish: {
        content: "이미지 선택 완료했습니다.",
        buttonText: "선별 이미지 확인하기",
        callBack: () => {
          navigate("/result", { state: { title: "선별 이미지 확인", step: "between" } });
        },
      },
    },
    {
      step: 2,
      title: "2차 탐색",
      wait: { content: "선별된 이미지를 바탕으로 지능형 탐색을 시작합니다." },
      process: { content: "등록된 정보로 지능형 탐색 중입니다." },
      finish: {
        content: "탐색 완료했습니다.",
        buttonText: "탐색 결과 확인하기",
        callBack: () => {
          navigate("/result", { state: { title: "2차 탐색 결과", step: "second" } });
        },
      },
    },
    {
      step: 3,
      title: "실종자 수색",
      wait: { content: "탐색 결과를 토대로 수색하는 단계입니다. 이전 단계가 끝나기를 잠시 기다려주세요." },
      process: { content: "탐색 결과를 토대로 수색 진행 중입니다." },
      finish: { content: "수색 완료했습니다.", buttonText: "", callBack: () => {} },
    },
  ];
  const navigate = useNavigate();
  const ContentsItem = ({ value, color }) => {
    return (
      <StContentsItem>
        <ContentText color={color}>{value.content}</ContentText>
        {value.buttonText && <ButtonContainer onClick={value.callBack}>{value.buttonText}</ButtonContainer>}
      </StContentsItem>
    );
  };

  return (
    <StStepContents>
      <Title color={index <= current ? "#1890ff" : "#A7A7A7"}>{StepContentsList[index].title} </Title>
      {index == current ? (
        <ContentsItem value={StepContentsList[index].process} color={"#000"} />
      ) : index < current ? (
        <ContentsItem value={StepContentsList[index].finish} color={"#000"} />
      ) : (
        <ContentsItem value={StepContentsList[index].wait} color={"#a7a7a7"} />
      )}
      {index == 1 && (
        <ExplainLink>
          이미지 선별 설명보기
          <RightOutlined />
        </ExplainLink>
      )}

      {/* <ContentText color={index <= current ? "#000" : "#A7A7A7"}>
        {index == current
          ? StepContentsList[index].process.content
          : index < current
            ? StepContentsList[index].finish.content
            : StepContentsList[index].wait.content}
      </ContentText> */}
    </StStepContents>
  );
};

const StStepContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.5rem;
  margin-top: 4.75rem;
  width: 77.5rem;
`;
const Title = styled.p`
  font-size: 5rem;
  font-weight: 600;
  color: ${(props) => props.color || "#1890FF"};
`;

const StContentsItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5.5rem;
`;

const ContentText = styled.p`
  word-break: keep-all;
  text-align: center;
  font-size: 3.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  color: ${(props) => props.color || "#1890FF"};
`;

const ButtonContainer = styled(Button)`
  width: 59.75rem;
  height: 12.5rem;
  border-radius: 2.5rem;
  background: #1890ff;
  color: #fff;

  font-size: 3.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
`;

const ExplainLink = styled.a`
  color: #a7a7a7;
  font-size: 3rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;

  span {
    margin-left: 1rem;
  }
`;
