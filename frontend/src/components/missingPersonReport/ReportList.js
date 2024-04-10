import styled from "styled-components";
import { Typography, List, Skeleton } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";

const data = [
  "2024-03-26 10:03:12",
  "2024-03-26 10:03:12",
  "2024-03-26 10:03:12",
  "2024-03-26 10:03:12",
  "2024-03-26 10:03:12",
];

export const ReportList = () => {
  return (
    <StReportList>
      <Typography.Title level={5}>지능형 탐색 결과</Typography.Title>
      <ListContainer>
        <List
          size="small"
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <ListItem actions={[<a key="list-loadmore-more">view</a>]}>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta avatar={<FileSearchOutlined />} description={item} />
              </Skeleton>
            </ListItem>
          )}
        />
      </ListContainer>
    </StReportList>
  );
};

const StReportList = styled.div`
  //width: 36rem;
  width: 100%;
  height: 21rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 1rem 1.5rem;
  gap: 0.62rem;
  border-radius: 0.3rem;
  background-color: white;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ListItem = styled(List.Item)`
  width: 32.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 0.5rem;
`;
