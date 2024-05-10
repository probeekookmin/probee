import styled from "styled-components";
import { Tabs, Select } from "antd";
import { ReportList } from "./ReportList";
import { ResultView } from "../common/ResultView";
import { useEffect ,useState} from "react";
const data = [
  { date: "2024-03-27", time: "17:03:14", accuracy: "0.0000" },
  { date: "2024-03-26", time: "17:03:14", accuracy: "0.0000" },
  { date: "2024-03-25", time: "17:03:14", accuracy: "0.0000" },
  { date: "2024-03-24", time: "17:03:14", accuracy: "0.0000" },
  { date: "2024-03-23", time: "17:03:14", accuracy: "0.0000" },
  { date: "2024-03-20", time: "17:03:14", accuracy: "0.0000" },
  { date: "2024-03-17", time: "17:03:14", accuracy: "0.0000" },
  { date: "2024-03-16", time: "17:03:14", accuracy: "0.0000" },
  { date: "2024-03-15", time: "17:03:14", accuracy: "0.0000" },
  { date: "2024-03-14", time: "17:03:14", accuracy: "0.0000" },
  { date: "2024-03-13", time: "17:03:14", accuracy: "0.0000" },
  { date: "2024-03-10", time: "17:03:14", accuracy: "0.0000" },
];
// const [data1, setData1] = useState([]);
// const [dataBetween, setdataBetween] = useState([]);
// const [data2, setData2] = useState([]);

const items = [
  {
    key: "1",
    label: "1차 탐색",
    children: <ResultView count={6} column={6} dataList = {data}/>,
  },
  {
    key: "2",
    label: "이미지 선별",
    children: <ResultView count={6} column={6} dataList = {data}/>,
  },
  {
    key: "3",
    label: "2차 탐색",
    children: <ResultView count={6} column={6} dataList = {data}/>,
  },
];
const operations = (
  <Select
    defaultValue="정확도순"
    size="small"
    style={{
      width: 120,
    }}
    options={[
      {
        value: "정확도순",
        label: "정확도순",
      },
      {
        value: "최근순",
        label: "최근순",
      },
      {
        value: "오래된순",
        label: "오래된순",
      },
    ]}
  />
);
export const ReportTabs = ({id}) => {
  console.log("ReportTabs_id: " + id);
  return (
    <StReportTabs>
      <TabContainer defaultActiveKey="1" items={items} size="small" tabBarExtraContent={operations} />
    </StReportTabs>
  );
};

const StReportTabs = styled.div`
  height: 100%;
  padding: 0rem 0.5rem;
  background-color: white;
  border-radius: 0.3rem;
`;

const TabContainer = styled(Tabs)`
  height: 100%;

  & .ant-tabs {
    height: 100%;
  }
`;
