import styled from "styled-components";
import { useEffect, useState } from "react";
import { Select, Pagination, Skeleton, List, Card, Col, Row, Form } from "antd";
import { SelectOptions } from "./SelectOptions";
import { getBetweenResultImg, getSearchResultImg } from "../../core/api";

export const ResultView = ({ count, dataList, type, id }) => {
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(0);

  useEffect(() => {
    if (type === "first") {
      console.log("useEffect-first");
      setData(dataList);
      setDataCount(count);
    } else {
      console.log("useEffect-other");
      fetchData();
    }
  }, [dataList]);

  const fetchData = () => {
    if (type === "between") {
      console.log("between");
      getBetweenResultImg(1, id).then((res) => {
        console.log("between", res.data);
        setData(res.data.list);
        setDataCount(count);
      });
    } else {
      getSearchResultImg(1, id, type).then((res) => {
        console.log("step2data", res.data);
        setData(res.data.list);
        setDataCount(count);
      });
    }
  };
  const onChangePage = (page) => {
    if (type === "between") {
      console.log("between");
      getBetweenResultImg(page, id).then((res) => {
        console.log("between", res.data);
        setData(res.data.list);
        setDataCount(res.data.count);
      });
    } else {
      getSearchResultImg(page, id, type).then((res) => {
        console.log("step2data", res.data);
        setData(res.data.list);
        setDataCount(res.data.count);
      });
    }
  };
  const Item = ({ item }) => {
    return (
      <ItemContainer>
        {item.imgUrl ? (
          <ItemImage src={item.imgUrl} alt="Image" />
        ) : (
          <Skeleton.Image active={false} style={{ width: "7.2rem", height: "11.9rem" }} />
        )}
        <p>{item.date}</p>
        <p>{item.time}</p>
        <p>정확도:{item.similarity}</p>
      </ItemContainer>
    );
  };
  return (
    <StResultView>
      <MiddleContainer>{data && data.map((item, idx) => <Item key={idx} item={item} />)}</MiddleContainer>
      <BottomContainer>
        <Paging
          size="small"
          defaultCurrent={1}
          defaultPageSize={6}
          total={dataCount}
          onChange={(page) => onChangePage(page)}
        />
      </BottomContainer>
      {/* <List
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
        // pagination={{
        //   onChange: (page) => {
        //     console.log(page);
        //   },
        //   pageSize: count,
        // }}
        dataSource={data}
        renderItem={(item) => (
          // <List.Item>
          //   <Card title={item.title}>Card content</Card>
          // </List.Item>
          <Item item={item} />
        )}
      /> */}
    </StResultView>
  );
};
const StResultView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;

  width: 100%;
  height: 100%;
  //bottom: 0;
  padding: 0rem 2rem;
  gap: 1.5rem;
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
    @media all and (max-width: 1537px) {
      font-size: 1rem;
    }
    font-size: 1.3rem;
  }
`;

const ItemImage = styled.img`
  width: 14.4rem;
  height: 23.8rem;
  @media all and (max-width: 1537px) {
    width: 7.2rem;
    height: 11.9rem;
  }
`;

const Paging = styled(Pagination)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  float: right;
`;
