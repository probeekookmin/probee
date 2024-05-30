import styled from "styled-components";
import { List } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";

/*지능형 탐색 이력 컴포넌트 */
export const ReportList = ({ history, handleClickList }) => {
  console.log("history", history);
  const ListItems = ({ item }) => {
    console.log("item", item);
    return (
      <ListItemContainer
        onClick={() => {
          handleClickList(item.searchId);
        }}>
        <ItemLeft>
          <FileSearchOutlined /> <p>{item.createdAt}</p>
        </ItemLeft>
        <ItemRight>
          <a>view</a>
        </ItemRight>
      </ListItemContainer>
    );
  };
  return (
    <StReportList>
      <Title>지능형 탐색 이력</Title>
      <ListContainer
        size="small"
        itemLayout="horizontal"
        dataSource={history}
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
  border-radius: 0.3rem;
  background-color: white;
`;
const Title = styled.p`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
  @media all and (max-width: 1536px) {
    margin: 0.7rem 0;
    font-size: 1.4rem;
  }
`;

const ListContainer = styled(List)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none; */
`;

const ListItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 0.5rem;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  background-color: white;
  font-size: 1.4rem;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
  @media all and (max-width: 1536px) {
    padding: 0.6rem 0.5rem;

    font-size: 1.2rem;
  }
`;

const ItemLeft = styled.div`
  display: flex;
  flex-direction: row;
`;
const ItemRight = styled.div`
  display: flex;
`;
