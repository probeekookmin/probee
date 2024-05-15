import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
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
import { getMissingPerson, getMissingPeopleStep, getSearchHistoryList, getSearchResultImg } from "../core/api";
import { useLocation } from "react-router-dom";
import { ReportMain } from "../components/missingPersonReport/ReportMain";
import { ReportIntelligent } from "../components/reportIntelligent/ReportIntelligent";
function MissingPersonReportPage() {
  const [missingPerson, setMissingPerson] = useState([]);
  const [step, setStep] = useState([]);
  const [searchHistoryList, setSearchHistoryList] = useState([]);
  const [step1data, setStep1data] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  console.log("sssdfsadfsad location", location);

  const { userId } = location.state || { userId: 89 }; //예외처리 필요 (id가 없을 경우 전에 봤던 것으로 이동 등으로 처리)

  /*지능형 탐색 시작하기 스크롤 이벤트 */
  const scrollToIntelligent = () => {
    const element = document.getElementById("intelligent");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    console.log("useEffect", userId);
    fetchData();
  }, []);

  const fetchData = () => {
    console.log("fetchData", userId);
    getMissingPeopleStep(userId).then((res) => {
      switch (res.data.step) {
        case "FIRST":
          setStep(1);
          break;
        case "BETWEEN":
          setStep(2);
          break;
        case "SECOND":
          setStep(3);
          break;
        case "EXIT":
          setStep(4);
          break;
        default:
          setStep(0);
      }
    });
    getMissingPerson(userId)
      .then((res) => {
        console.log("missingPerson", res.data);
        setMissingPerson(res.data);
        if (res.data.status === "exit") {
          setStep(5);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    getSearchHistoryList(userId).then((res) => {
      setSearchHistoryList(res.data);
    });
    getSearchResultImg(1, userId, "first").then((res) => {
      console.log("step1data", res.data);
      setStep1data(res.data);
    });
  };

  /*지능형 탐색 시작하기 버튼 */
  const ReportStartBtn = () => {
    return (
      <StReportStartBtn onClick={scrollToIntelligent}>
        <ReportStartBtnLeft>
          <ReconciliationOutlined style={{ fontSize: "2rem", color: "#1890FF" }} />
          <p>지능형 탐색</p>
        </ReportStartBtnLeft>
        <a> 시작하기</a>
      </StReportStartBtn>
    );
  };
  /*실종자 리포트 - 메인*/
  // const ReportMain = () => {
  //   return (
  //     <StReport>
  //       <Row gutter={[8, 10]}>
  //         <Col span={6}>
  //           <BasicInfo data={missingPerson} />
  //         </Col>
  //         <Col span={14}>
  //           <ReportMap />
  //         </Col>
  //         <Col span={4}>
  //           <StepProgress step={step} />
  //         </Col>
  //         <Col span={6} md={6}>
  //           <Row style={{ marginBottom: 8 }}>
  //             <ReportList listData={searchHistoryList} />
  //           </Row>
  //           <Row>
  //             <ReportStartBtn />
  //           </Row>
  //         </Col>
  //         <Col span={18} md={18}>
  //           <ReportTabs id={id} />
  //         </Col>
  //       </Row>
  //     </StReport>
  //   );
  // };
  /*실종자 리포트 - 지능형 탐색*/
  // const ReportIntelligent = () => {
  //   return (
  //     <StReport id="intelligent">
  //       <Row gutter={[10, 8]} type="flex" style={{ height: "100%" }}>
  //         <Col span={20} style={{ height: "2%" }}>
  //           <Typography.Title
  //             level={5}
  //             style={{
  //               margin: 0,
  //             }}>
  //             지능형 탐색
  //           </Typography.Title>
  //         </Col>
  //         <Col span={14} style={{ height: "33%" }}>
  //           <IntelligentBasicInfo />
  //         </Col>
  //         <Col span={10} style={{ height: "33%" }}>
  //           <IntelligentSearchOption />
  //         </Col>
  //         <Col span={14}>
  //           <IntelligentMap />
  //         </Col>
  //         <Col span={10} style={{ height: "62%" }}>
  //           <IntelligentSearchResult />
  //         </Col>
  //       </Row>
  //     </StReport>
  //   );
  // };

  return (
    <StMissingPersonReportPage>
      {/* <ReportMain />
      <ReportIntelligent /> */}
      <StReport>
        <ReportMain
          data={missingPerson}
          step={step}
          history={searchHistoryList}
          step1data={step1data}
          onClick={scrollToIntelligent}
        />
      </StReport>
      <StReport>
        <ReportIntelligent data={missingPerson} />
      </StReport>
    </StMissingPersonReportPage>
  );
}
export default MissingPersonReportPage;

const StMissingPersonReportPage = styled.div`
  padding: 1rem 3rem 0 3rem;
  margin-bottom: 1rem;
  gap: 1rem;
  height: 100vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
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
