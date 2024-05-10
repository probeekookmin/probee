import styled from "styled-components";
import { Select, Pagination, Skeleton, List, Card, Col, Row } from "antd";
import { useEffect,useState } from "react";

// const data = [
//   { date: "2024-03-27", time: "17:03:14", accuracy: "0.0000" },
//   { date: "2024-03-26", time: "17:03:14", accuracy: "0.0000" },
//   { date: "2024-03-25", time: "17:03:14", accuracy: "0.0000" },
//   { date: "2024-03-24", time: "17:03:14", accuracy: "0.0000" },
//   { date: "2024-03-23", time: "17:03:14", accuracy: "0.0000" },
//   { date: "2024-03-20", time: "17:03:14", accuracy: "0.0000" },
//   { date: "2024-03-17", time: "17:03:14", accuracy: "0.0000" },
//   { date: "2024-03-16", time: "17:03:14", accuracy: "0.0000" },
//   { date: "2024-03-15", time: "17:03:14", accuracy: "0.0000" },
//   { date: "2024-03-14", time: "17:03:14", accuracy: "0.0000" },
//   { date: "2024-03-13", time: "17:03:14", accuracy: "0.0000" },
//   { date: "2024-03-10", time: "17:03:14", accuracy: "0.0000" },
// ];
export const ResultView = ({ column, count, dataList}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(dataList);
  }, [dataList]);
  const Item = ({ item }) => {
    return (
      <ItemContainer>
        <Skeleton.Image active={false} style={{ width: "7.2rem", height: "11.9rem" }} />
        <p>{item.date}</p>
        <p>{item.time}</p>
        <p>정확도:{item.accuracy}</p>
      </ItemContainer>
    );
  };
  return (
    <StResultView>
      {/* <MiddleContainer>
        {data.map((item, idx) => (
          <Item key={idx} item={item} />
        ))}
      </MiddleContainer>
      <BottomContainer>
        <Paging size="small" defaultCurrent={1} total={6} />
      </BottomContainer> */}

      <List
        grid={{
          gutter: 16,
          column: column,
          // xs: 1,
          // sm: 2,
          // md: 4,
          // lg: 4,
          // xl: 8,
          // xxl: 8,
        }}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: count,
        }}
        dataSource={data}
        renderItem={(item) => (
          // <List.Item>
          //   <Card title={item.title}>Card content</Card>
          // </List.Item>
          <Item item={item} />
        )}
      />

      {/* <BottomContainer>
        <Paging size="small" defaultCurrent={1} total={6} />
      </BottomContainer> */}
    </StResultView>
  );
};
const StResultView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  gap: 1.5rem;

  width: 100%;
  height: 100%;
  //bottom: 0;
  padding: 0rem 2rem;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: space-between;
  //height: 100%;
`;
const BottomContainer = styled.div`
  /* display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  float: right;
  width: 100%; */
  display: flex;
  flex-direction: row;
  justify-content: end;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.9rem;

  p {
    font-size: 1rem;
  }
`;

const Paging = styled(Pagination)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  float: right;
`;
