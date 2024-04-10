import styled from "styled-components";
import { Tabs } from "antd";

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
    children: "Content of Tab Pane 3",
  },
];
export const ReportTabs = () => {
  return (
    <StReportTabs>
      <Tabs defaultActiveKey="1" items={items} />
    </StReportTabs>
  );
};

const StReportTabs = styled.div`
  height: 17.25rem;
  padding: 0.5rem;
  background-color: white;
`;
