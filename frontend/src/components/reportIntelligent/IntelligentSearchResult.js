import styled from "styled-components";
import { useEffect, useState } from "react";
import { Typography, Select, Skeleton, Pagination, Empty } from "antd";
import { ResultView } from "../common/ResultView";
import { getSearchResultImg } from "../../core/api";

export const IntelligentSearchResult = ({ userId, resultData, resultId }) => {
  const [searchStart, setSearchStart] = useState(false);
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(0);

  useEffect(() => {
    if (resultData && Object.keys(resultData).length > 0) {
      console.log("resultData", resultData);
      setData(resultData.list);
      setDataCount(resultData.count);
      setSearchStart(true);
    }
  }, [resultData]);

  const onChangePage = (page) => {
    getSearchResultImg(page, userId, "first", resultId, 8).then((res) => {
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
    <StSearchResult>
      <Title
        level={5}
        style={{
          margin: 0,
        }}>
        탐색 결과
      </Title>
      {/* <TopContainer>
        <Select
          defaultValue="정확도순"
          size="small"
          style={{
            width: 120,
          }}
          options={[
            {
              value: "정확도순",
              label: "정확도순",
            },
            {
              value: "최근순",
              label: "최근순",
            },
            {
              value: "오래된순",
              label: "오래된순",
            },
          ]}
        />
      </TopContainer> */}
      <ContentsContainer>
        <ResultContainer>
          {searchStart ? (
            data.map((item, idx) => <Item key={idx} item={item} />)
          ) : (
            <EmptyContainer>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </EmptyContainer>
          )}
        </ResultContainer>
        <BottomContainer>
          {searchStart && (
            <Paging
              size="small"
              defaultCurrent={1}
              defaultPageSize={8}
              total={dataCount}
              onChange={(page) => onChangePage(page)}
            />
          )}
        </BottomContainer>
      </ContentsContainer>
    </StSearchResult>
  );
};

const StSearchResult = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;

  background-color: white;
  border-radius: 1rem;
`;

const Title = styled.p`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
  @media (max-width: 1440px) and (min-width: 1367px), (max-width: 1366px) and (min-width: 1281px) {
    /* margin: 0.8rem 0; */
    font-size: 1.3rem;
  }
  @media (max-width: 1280px) and (min-width: 0px) {
    margin: 0.6rem 0;
    font-size: 1.1rem;
  }
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;

  width: 100%;
  height: 100%;
  //bottom: 0;
  padding: 1rem 0;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  height: 90%;
  margin-bottom: 2rem;
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
    font-size: 1.3rem;
    margin: 0.3rem 0;
    @media all and (max-width: 1537px) {
      font-size: 1rem;
    }
  }
`;

const ItemImage = styled.img`
  width: 14.4rem;
  height: 23.8rem;
  /* width: 12.96rem;
  height: 21.42rem; */
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
