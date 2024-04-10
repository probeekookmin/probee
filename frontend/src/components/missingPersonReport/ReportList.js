import styled from "styled-components";
import { Typography, List, Skeleton } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";

const data = ["2024-03-26 10:03:12", "2024-03-26 10:03:12", "2024-03-26 10:03:12", "2024-03-26 10:03:12"];

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
            <List.Item actions={[<a key="list-loadmore-more">more</a>]}>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta avatar={<FileSearchOutlined />} description={item} />
              </Skeleton>
            </List.Item>
          )}
        />
      </ListContainer>
    </StReportList>
  );
};

const StReportList = styled.div`
  width: 22.56rem;

  padding: 0.68rem 0.94rem;
  gap: 0.62rem;
  background-color: white;
`;

const ListContainer = styled.div`
  overflow: "auto";
`;
