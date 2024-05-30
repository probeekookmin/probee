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
          <ButtonText>
            <ButtonTitle>지능형 탐색 시작하기</ButtonTitle>
            <ButtonDescription>조건을 입력하여 추가적으로</ButtonDescription>
            <ButtonDescription>지능형 탐색을 진행할 수 있습니다.</ButtonDescription>
          </ButtonText>

          <ImageContainer>
            <ButtonImage src={AddSearchBtnImg} />
          </ImageContainer>
        </ButtonContents>
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
  flex-direction: row;
  justify-content: center;
  align-items: start;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0rem 0 0 2rem;
  margin-top: 1rem;
  background-color: white;
  border-radius: 0.5rem;

  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f0f3ff;
  }
`;

const ButtonText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 55%;
  height: 100%;
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
  @media (max-width: 1900px) and (min-width: 1601px) {
    font-size: 1.1rem;
  }
  @media (max-width: 1600px) and (min-width: 1301px) {
    font-size: 1rem;
  }
  @media (max-width: 1300px) and (min-width: 1280px) {
    font-size: 1rem;
  }
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  width: 45%;
  height: 100%;
  padding-right: 2rem;

  @media all and (max-width: 1600px) {
    padding-top: 1rem;
    padding-right: 0rem;
  }
`;

const ButtonImage = styled.img`
  width: 100%;
  /* width: 24rem;
  height: 10rem; */
  /* @media all and (max-width: 1600px) {
    width: 12rem;
    height: 8rem;
  } */
  /* @media (max-width: 1900px) and (min-width: 1601px) {
    width: 20.4rem;
    height: 8.5rem;
  }

  @media (max-width: 1600px) and (min-width: 1301px) {
    width: 18rem;
    height: 8rem;
  }
  @media (max-width: 1300px) and (min-width: 1280px) {
    width: 14.4rem;
    height: 6rem;
  } */
`;
