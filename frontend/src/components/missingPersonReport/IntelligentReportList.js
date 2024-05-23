import { Button, Typography } from "antd";
import styled from "styled-components";
import { ReportList } from "./ReportList";
// import AddSearchBtnImg from "../../assets/images/addSearchButtonImg.svg";
import AddSearchBtnImg from "../../assets/images/buttonImg.svg";

export const IntelligentReportList = ({ history, onClick, handleClickList }) => {
  const MoveButton = ({ onClick }) => {
    return (
      <ButtonContainer onClick={onClick}>
        <ButtonContents>
          <ButtonTitle>지능형 탐색 시작하기</ButtonTitle>
          <ButtonDescription>조건을 입력하여 추가적으로</ButtonDescription>
          <ButtonDescription>지능형 탐색을 진행할 수 있습니다.</ButtonDescription>
        </ButtonContents>
        <ImageContainer>
          <ButtonImage src={AddSearchBtnImg} />
        </ImageContainer>
      </ButtonContainer>
    );
  };
  return (
    <StIntelligentReportList>
      {/* <Title>지능형 탐색</Title> */}
      <MoveButton onClick={onClick} />
      <ReportList history={history} handleClickList={handleClickList} />
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 11.5rem;

  position: relative;
  padding: 0;
  margin-bottom: 1rem;
  background-color: none;

  @media all and (max-width: 1500px) {
    height: 9rem;
  }

  &:hover {
    cursor: pointer;
  }
`;

const ButtonContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 100%;
  padding: 0rem 0 0 2rem;
  margin-top: 1rem;
  background-color: white;
  border-radius: 0.5rem;

  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
`;

const ButtonTitle = styled.p`
  font-size: 1.6rem;
  color: #1677ff;
  line-height: 1.5;
  @media all and (max-width: 1600px) {
    font-size: 1.4rem;
  }
`;

const ButtonDescription = styled.p`
  font-size: 1.2rem;
  white-space: pre-line;
  color: #686767;
  line-height: 1.5;
  @media all and (max-width: 1600px) {
    font-size: 1rem;
  }
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: end;
  /* align-items: end; */
  position: absolute;
  width: 100%;
  height: 100%;
  /* padding-bottom: 1rem; */
  /* padding-right: 6rem; */
  @media all and (max-width: 1600px) {
    padding-top: 1rem;
  }
`;

const ButtonImage = styled.img`
  width: 24rem;
  height: 10rem;
  @media all and (max-width: 1600px) {
    width: 12rem;
    height: 8rem;
  }
`;
