import styled from "styled-components";
import { Tabs, Select } from "antd";
import { ReportList } from "./ReportList";
import { ResultView } from "../common/ResultView";

const items = [
  {
    key: "1",
    label: "1차 탐색",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "이미지 선별",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "2차 탐색",
    children: <ResultView count={6} column={6} />,
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
export const ReportTabs = () => {
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
