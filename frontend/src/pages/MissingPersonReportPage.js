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
import {
  getMissingPerson,
  getMissingPeopleStep,
  getSearchHistoryList,
  getSearchResultImg,
  getBetweenResultImg,
  getCCTVResult,
} from "../core/api";
import { useLocation } from "react-router-dom";
import { ReportMain } from "../components/missingPersonReport/ReportMain";
import { ReportIntelligent } from "../components/reportIntelligent/ReportIntelligent";
function MissingPersonReportPage() {
  const [missingPerson, setMissingPerson] = useState([]);
  const [step, setStep] = useState([]);
  const [searchHistoryList, setSearchHistoryList] = useState([]);
  const [firstdata, setFirstdata] = useState([]);
  const [betweenData, setBetweenData] = useState([]);
  const [secondData, setSecondData] = useState([]);
  const [firstCCTVData, setFirstCCTVData] = useState([]);
  const [betweenCCTVData, setBetweenCCTVData] = useState([]);
  const [secondCCTVData, setSecondCCTVData] = useState([]);
  const [clickData, setClickData] = useState([]); //클릭한 리스트 데이터
  const [clickId, setClickId] = useState(); //클릭한 리스트 아이디
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
    fetchResultData();
    fetchCCTVData();
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
  };

  const fetchResultData = () => {
    getSearchResultImg(1, userId, "first").then((res) => {
      console.log("firstData", res.data);
      setFirstdata(res.data);
    });
    getBetweenResultImg(1, userId).then((res) => {
      console.log("betweenData", res.data);
      setBetweenData(res.data);
    });
    getSearchResultImg(1, userId, "second").then((res) => {
      console.log("secondData", res.data);
      setSecondData(res.data);
    });
  };

  const fetchCCTVData = () => {
    getCCTVResult(userId, "first").then((res) => {
      console.log("firstCCTVData", res.data);
      setFirstCCTVData(res.data);
    });
    getCCTVResult(userId, "between").then((res) => {
      console.log("betweenCCTVData", res.data);
      setBetweenCCTVData(res.data);
    });
    getCCTVResult(userId, "second").then((res) => {
      console.log("secondCCTVData", res.data);
      setSecondCCTVData(res.data);
    });
  };

  const handleClickList = (id) => {
    getSearchResultImg(1, userId, "", id, 8).then((res) => {
      console.log("clickData", res.data);
      setClickData(res.data);
      setClickId(id);
    });
    scrollToIntelligent();
  };

  return (
    <StMissingPersonReportPage>
      <StReport>
        <ReportMain
          data={missingPerson}
          step={step}
          history={searchHistoryList}
          firstdata={firstdata}
          betweenData={betweenData}
          secondData={secondData}
          onClick={scrollToIntelligent}
          handleClickList={handleClickList}
          firstCCTVData={firstCCTVData}
          betweenCCTVData={betweenCCTVData}
          secondCCTVData={secondCCTVData}
        />
      </StReport>
      <StReport>
        <ReportIntelligent data={missingPerson} clickData={clickData} clickId={clickId} />
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

const StReport = styled.div`
  height: 100vh;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-snap-align: center;
`;
