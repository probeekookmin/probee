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
      <Typography.Title level={5}>지능형 탐색 결과</Typography.Title>
      <ListContainer>
        <ListWrapper
          size="small"
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => <ListItems item={item} />}
          pagination={{
            pageSize: 3,
            position: "bottom",
            showSizeChanger: false,
            size: "small",
            simple: true,
            responsive: false,
          }}
        />
      </ListContainer>
    </StReportList>
  );
};

const StReportList = styled.div`
  //width: 36rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 1.2rem 1.5rem;
  gap: 0.62rem;
  border-radius: 0.3rem;
  background-color: white;
`;

const ListContainer = styled.div`
  //height: 20rem;
  height: auto;
  min-height: 100%;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ListItemContainer = styled.div`
  padding: 1rem 0.5rem;
`;

const ListWrapper = styled(List)`
  height: 100%;
`;
