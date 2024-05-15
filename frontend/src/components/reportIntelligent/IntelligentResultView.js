import styled from "styled-components";
import { useEffect, useState } from "react";
import { Select, Pagination, Skeleton, List, Card, Col, Row, Form, Empty } from "antd";
import { getSearchResultImg } from "../../core/api";

export const IntelligentResultView = ({ id }) => {
  const [searchStart, setSearchStart] = useState(false);
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(0);

  useEffect(() => {
    console.log("useEffect", id);
    if (id != null) fetchData();
  }, [id]);

  const fetchData = () => {
    getSearchResultImg(1, id, "first").then((res) => {
      console.log("IntelligentResultView", res.data);
      setData(res.data.list);
      setDataCount(res.data.count);
      setSearchStart(true);
    });
  };
  const onChangePage = (page) => {
    getSearchResultImg(page, id, "first").then((res) => {
      console.log("IntelligentResultView", res.data);
      setData(res.data.list);
    });
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
    <StIntelligentResultView>
      <MiddleContainer>
        {searchStart ? (
          data.map((item, idx) => <Item key={idx} item={item} />)
        ) : (
          <EmptyContainer>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
          </EmptyContainer>
        )}
      </MiddleContainer>
      <BottomContainer>
        {searchStart && (
          <Paging
            size="small"
            defaultCurrent={1}
            defaultPageSize={6}
            total={dataCount}
            onChange={(page) => onChangePage(page)}
          />
        )}
      </BottomContainer>
    </StIntelligentResultView>
  );
};
const StIntelligentResultView = styled.div`
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
  height: 90%;
`;
const BottomContainer = styled.div`
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

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;
