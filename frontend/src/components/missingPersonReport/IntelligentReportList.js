import { Button, Typography } from "antd";
import styled from "styled-components";
import { ReportList } from "./ReportList";

export const IntelligentReportList = ({ history, onClick }) => {
  const MoveButton = ({ onClick }) => {
    return (
      <ButtonContainer onClick={onClick}>
        <ButtonContents>
          <ButtonTitle>지능형 탐색 시작하기</ButtonTitle>
          <ButtonDescription>조건을 입력하여 추가적으로 지능형 탐색을</ButtonDescription>
          <ButtonDescription>진행할 수 있습니다.</ButtonDescription>
        </ButtonContents>
      </ButtonContainer>
    );
  };
  return (
    <StIntelligentReportList>
      {/* <Title>지능형 탐색</Title> */}
      <MoveButton onClick={onClick} />
      <ReportList history={history} />
    </StIntelligentReportList>
  );
};
const StIntelligentReportList = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  gap: 1rem;

  /* background-color: lightpink; */
`;

const Title = styled.p`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.8rem;
  font-weight: 600;
  @media all and (max-width: 1500px) {
    font-size: 1.6rem;
  }
`;

const ButtonContainer = styled(Button)`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 11.5rem;
  border-radius: 0.5rem;
  background-color: white;
  @media all and (max-width: 1500px) {
    height: 9rem;
  }
`;

const ButtonContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 100%;
`;

const ButtonTitle = styled.p`
  font-size: 1.6rem;
  @media all and (max-width: 1500px) {
    font-size: 1.4rem;
  }
`;

const ButtonDescription = styled.p`
  font-size: 1.2rem;
  white-space: pre-line;
  color: #686767;
  @media all and (max-width: 1500px) {
    font-size: 1rem;
  }
`;
