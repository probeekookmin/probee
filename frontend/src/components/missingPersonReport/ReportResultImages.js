import { Tabs } from "antd";
import styled from "styled-components";

export const ReportResultImages = () => {
  const items = [
    {
      key: "1",
      label: "1차 탐색",
      children: <></>,
    },
    {
      key: "2",
      label: "이미지 선별",
      children: <></>,
    },
    {
      key: "3",
      label: "2차 탐색",
      children: <></>,
    },
  ];
  return (
    <StReportResultImages>
      <Tabs defaultActiveKey="1" type="card" items={items} size="small"></Tabs>
    </StReportResultImages>
  );
};

const StReportResultImages = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 0.4rem;
  background-color: rgba(255, 255, 255, 0.5);
`;
