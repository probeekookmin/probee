import { Typography } from "antd";
import styled from "styled-components";
import { BasicInfo } from "./BasicInfo";
import { ReportMap } from "./ReportMap";
import { StepProgress } from "./StepProgress";
import { IntelligentReportList } from "./IntelligentReportList";
import { ReportTabs } from "./ReportTabs";
import { ReportResultImages } from "./ReportResultImages";

export const ReportMain = ({ data, step, history, step1data, onClick }) => {
  //console.log("ReportMain_id: " + id.id);
  console.log("ReportMain_data: ", data);
  console.log("ReportMain_step: ", step);
  console.log("ReportMain_history: ", history);
  console.log("ReportMain_step1data: ", step1data);
  return (
    <StReportMain>
      <TitleContainer>
        <p>실종자 리포트</p>
      </TitleContainer>

      {/* <Container1>
        <BasicInfo data={data.data} />
        <ReportMap />
        <StepProgress />
      </Container1>
      <Container2></Container2> */}
      <ContentsContainer>
        <ContainerLeft>
          <Container1>
            <BasicInfo data={data} />
          </Container1>
          <Container2>
            <IntelligentReportList history={history} onClick={onClick} />
          </Container2>
        </ContainerLeft>
        <ContainerRight>
          <Container1>
            <ReportMap />
            <StepProgress step={step} />
          </Container1>
          <Container2>
            <ReportTabs id={data.id} step1data={step1data} />
          </Container2>
        </ContainerRight>
      </ContentsContainer>
    </StReportMain>
  );
};

const StReportMain = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 5%;

  p {
    margin: 0;
    font-size: 1.7rem;
    font-weight: bold;

    @media all and (min-width: 1537px) {
      font-size: 2rem;
    }
  }

  /* background-color: lightcoral; */
`;

const Container1 = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */

  width: 100%;
  height: 55%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  gap: 3rem;

  /* background-color: skyblue; */
`;
const Container2 = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 45%;
  padding-bottom: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;

  /* background-color: lightcoral; */
  @media all and (max-width: 1536px) {
    margin: 0;
    padding-bottom: 0;
  }
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 95%;
`;

const ContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 100%;
  /* background-color: skyblue; */

  @media all and (min-width: 1680px) {
    margin-right: 3.8rem;
  }
  @media all and (max-width: 1600px) {
    margin-right: 2.5rem;
  }
`;
const ContainerRight = styled.div`
  width: 70%;
  height: 100%;
  /* background-color: lightcoral; */
`;
