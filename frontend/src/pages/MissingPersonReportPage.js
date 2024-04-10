import styled from "styled-components";
import { Row, Col, Typography } from "antd";
import { ReconciliationOutlined } from "@ant-design/icons";

import { BasicInfo } from "../components/missingPersonReport/BasicInfo";
import { StepProgress } from "../components/missingPersonReport/StepProgress";
import { ReportList } from "../components/missingPersonReport/ReportList";
import { ReportMap } from "../components/missingPersonReport/ReportMap";
import { ReportTabs } from "../components/missingPersonReport/ReportTabs";

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
  return (
    <StMissingPersonReportPage>
      <Row style={{ marginBottom: 8 }} gutter={8}>
        <Col span={6}>
          <BasicInfo />
        </Col>
        <Col span={14}>
          <ReportMap />
        </Col>
        <Col span={4}>
          <StepProgress />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={6}>
          <Row style={{ marginBottom: 8 }}>
            <ReportList />
          </Row>
          <Row>
            <ReportStartBtn />
          </Row>
        </Col>
        <Col span={18}>
          <ReportTabs />
        </Col>
      </Row>
    </StMissingPersonReportPage>
  );
}
export default MissingPersonReportPage;

const StMissingPersonReportPage = styled.div`
  padding: 1rem 1rem;
  gap: 1rem;
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
