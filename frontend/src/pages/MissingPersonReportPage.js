import styled from "styled-components";
import { Row, Col, Typography } from "antd";
import { ReconciliationOutlined } from "@ant-design/icons";
import { BasicInfo } from "../components/missingPersonReport/BasicInfo";
import { StepProgress } from "../components/missingPersonReport/StepProgress";
import { ReportList } from "../components/missingPersonReport/ReportList";
import { ReportMap } from "../components/missingPersonReport/ReportMap";
import { ReportTabs } from "../components/missingPersonReport/ReportTabs";
import { IntelligentSearchOption } from "../components/reportIntelligent/IntelligentSearchOption";
import { IntelligentBasicInfo } from "../components/reportIntelligent/IntelligentBasicInfo";
import { IntelligentMap } from "../components/reportIntelligent/IntelligentMap";
import { IntelligentSearchResult } from "../components/reportIntelligent/IntelligentSearchResult";

function MissingPersonReportPage() {
  const ReportStartBtn = () => {
    return (
      <StReportStartBtn>
        <ReportStartBtnLeft>
          <ReconciliationOutlined style={{ fontSize: "2rem", color: "#1890FF" }} />
          <p>지능형 탐색</p>
        </ReportStartBtnLeft>
        <a> 시작하기</a>
      </StReportStartBtn>
    );
  };
  const ReportMain = () => {
    return (
      <StReport>
        <Row gutter={[8, 10]}>
          <Col span={6}>
            <BasicInfo />
          </Col>
          <Col span={14}>
            <ReportMap />
          </Col>
          <Col span={4}>
            <StepProgress />
          </Col>
          <Col span={6} md={6}>
            <Row style={{ marginBottom: 8 }}>
              <ReportList />
            </Row>
            <Row>
              <ReportStartBtn />
            </Row>
          </Col>
          <Col span={18} md={18}>
            <ReportTabs />
          </Col>
        </Row>
      </StReport>
    );
  };
  const ReportIntelligent = () => {
    return (
      <StReport>
        <Row gutter={[10, 8]} type="flex" style={{ height: "100%" }}>
          <Col span={20} style={{ height: "2%" }}>
            <Typography.Title
              level={5}
              style={{
                margin: 0,
              }}>
              지능형 탐색
            </Typography.Title>
          </Col>
          <Col span={14} style={{ height: "33%" }}>
            <IntelligentBasicInfo />
          </Col>
          <Col span={10} style={{ height: "33%" }}>
            <IntelligentSearchOption />
          </Col>
          <Col span={14}>
            <IntelligentMap />
          </Col>
          <Col span={10} style={{ height: "62%" }}>
            <IntelligentSearchResult />
          </Col>
        </Row>
      </StReport>
    );
  };
  return (
    <StMissingPersonReportPage>
      <ReportMain />
      <ReportIntelligent />
    </StMissingPersonReportPage>
  );
}
export default MissingPersonReportPage;

const StMissingPersonReportPage = styled.div`
  padding: 1rem 1rem;
  gap: 1rem;
  height: 100vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-snap-type: y mandatory;
  behavior: smooth;
`;
const StReportStartBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 5.2rem;
  padding: 0rem 0.94rem;
  border-radius: 0.3rem;
  background-color: #f0f3ff;
`;

const ReportStartBtnLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  p {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const StReport = styled.div`
  height: 100vh;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-snap-align: center;
`;
