import styled from "styled-components";
import { Select, Pagination, Skeleton } from "antd";

const data = [
  { date: "2024-03-26", time: "17:03:14", accuracy: "0.0000" },
  { date: "2024-03-26", time: "17:03:14", accuracy: "0.0000" },
  { date: "2024-03-26", time: "17:03:14", accuracy: "0.0000" },
  { date: "2024-03-26", time: "17:03:14", accuracy: "0.0000" },
  { date: "2024-03-26", time: "17:03:14", accuracy: "0.0000" },
  { date: "2024-03-26", time: "17:03:14", accuracy: "0.0000" },
];

export const ResultView = () => {
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
      <MiddleContainer>
        {data.map((item, idx) => (
          <Item key={idx} item={item} />
        ))}
      </MiddleContainer>
      <BottomContainer>
        <div></div>
        <Paging size="small" defaultCurrent={1} total={50} />
      </BottomContainer>
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
  bottom: 0;
  padding: 0rem 2rem;
`;
const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  float: right;
`;
const MiddleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 100%;
`;
const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  float: right;
  width: 100%;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

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
