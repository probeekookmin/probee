import styled from "styled-components";
import { Typography, List, Skeleton, Flex, Row, Col } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";

const data = [
  "2024-03-26 10:03:12",
  "2024-03-24 10:03:12",
  "2024-03-22 10:03:12",
  "2024-03-20 10:03:12",
  "2024-03-14 10:03:12",
  "2024-03-06 10:03:12",
  "2024-03-04 10:03:12",
  "2024-03-02 10:03:12",
  "2024-02-20 10:03:12",
  "2024-02-14 10:03:12",
];

export const ReportList = () => {
  const ListItems = ({ item }) => {
    return (
      <ListItemContainer>
        <Row gutter={8} justify="space-around">
          <Col span={2}>
            <FileSearchOutlined />
          </Col>
          <Col span={19}>
            <p>{item}</p>
          </Col>
          <Col span={3}>
            <a>view</a>
          </Col>
        </Row>
      </ListItemContainer>
    );
  };
  return (
    <StReportList>
      <Row style={{ height: "100%" }}>
        <Col span={24}>
          <Typography.Title level={5}>지능형 탐색 결과</Typography.Title>
        </Col>
        <Col span={24}>
          <ListContainer>
            <ListWrapper
              size="small"
              // itemLayout="horizontal"
              grid={{
                gutter: [16, 24],
                column: 1,
              }}
              dataSource={data}
              renderItem={(item) => <ListItems item={item} />}
              pagination={{
                pageSize: 4,

                position: "bottom",
                // showSizeChanger: false,
                size: "small",
                simple: true,
                showLessItems: true,
                responsive: true,
              }}
            />
          </ListContainer>
        </Col>
      </Row>
    </StReportList>
  );
};
const StReportList = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  gap: 0.62rem;
`;
const Container = styled.div`
  //width: 36rem;
  width: 100%;
  /* height: 45rem; */
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 1.2rem 1.5rem;
  gap: 0.62rem;
  border-radius: 0.3rem;
  background-color: white;

  /* @media all and (max-width: 1280px) {
    height: 5rem;
  }
  //1366px ~ 1679px
  @media screen and (min-width: 1366px) and (max-width: 1535px) {
    height: 70%;
  }
  @media (min-width: 1536) and (max-width: 1679px) {
    height: 80%;
  } //1680px 보다 큰
  @media (min-width: 1680px) {
    height: 100%;
  } */

  /* @media (max-width: 1680px) {
    height: 100%;
  }

  @media (max-width: 1536px) {
    height: 100%;
  }

  @media (max-width: 1366px) {
    height: 50%;
  } */
`;

const ListContainer = styled.div`
  //height: 20rem;
  /* height: 100%; */
  width: 100%;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ListItemContainer = styled.div`
  width: 100%;
  padding: 1rem 0.5rem;
`;

const ListWrapper = styled(List)`
  width: 100%;
  height: 100%;
`;
