import { Typography } from "antd";
import { warnContext } from "antd/es/config-provider";
import styled from "styled-components";

/*
    StepContentsList: 탐색 단계별 내용
    - title: 탐색 단계 제목
    - content: 탐색 단계 내용
    - buttonText: 버튼 텍스트
    - callBack: 버튼 클릭 시 실행할 함수

    wait, process, finish

 */

const StepContentsList = [
  {
    step: 0,
    title: "1차 탐색",
    wait: { content: "" },
    process: { content: "" },
    finish: { content: "", buttonText: "", callBack: () => {} },
  },
  {
    step: 1,
    title: "탐색 이미지 선별",
    wait: { content: "" },
    process: { content: "" },
    finish: { content: "", buttonText: "", callBack: () => {} },
  },
  {
    step: 2,
    title: "2차 탐색",
    wait: { content: "" },
    process: { content: "" },
    finish: { content: "", buttonText: "", callBack: () => {} },
  },
  {
    step: 3,
    title: "실종자 수색",
    wait: { content: "" },
    process: { content: "" },
    finish: { content: "", buttonText: "", callBack: () => {} },
  },
];

export const StepContents = ({ index, disable }) => {
  return (
    <StStepContents>
      <Title level={5}> </Title>
    </StStepContents>
  );
};

const StStepContents = styled.div``;
const Title = styled(Typography.Title)`
  margin: 0;
`;
