import { Button, Form, Input, List, Radio, Typography } from "antd";
import styled from "styled-components";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { CardView } from "../components/missingPersonList/CardView";
import { dummyAll } from "../data/DummyData";
import VirtualList from "rc-virtual-list";
import { getAllMissingPerson } from "../core/api";
const { Text, Link } = Typography;

function MissingPersonListPage() {
  const [filter, setFilter] = useState(""); // ["all", "process", "finish"
  const [search, setSearch] = useState("");
  const [init, setInit] = useState(true);
  const [missingPersonList, setMissingPersonList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      fetchData();
    }
  }, [pageNum, filter, search]);

  const onFilterChange = (e) => {
    console.log("radio checked", e.target.value);
    setPageNum(1);
    setFilter(e.target.value);
    setInit(false);
  };

  // const onScroll = (e) => {
  //   if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
  //     getAllMissingPerson(1).then((res) => {
  //       setMissingPersonList(res);
  //       console.log("missingPersonList", missingPersonList);
  //     });
  //   }
  // };

  const onFinish = (value) => {
    console.log("Success:", value);
    setPageNum(1);
    setSearch(value.search);
    setInit(false);
  };

  const onReset = () => {
    setPageNum(1);
    setFilter("");
    setSearch("");
    setInit(true);
  };

  const fetchData = () => {
    console.log("fetchData", pageNum);
    setLoading(true);
    getAllMissingPerson(pageNum, filter, search)
      .then((res) => {
        if (pageNum === 1) {
          const newPageData = res.data;
          if (newPageData.length > 0) {
            console.log("newPageData", newPageData);
            setMissingPersonList([...newPageData]);
          } else {
            setMissingPersonList([]);
          }
        } else {
          const newPageData = res.data.filter((item) => !missingPersonList.some((existing) => existing.id === item.id));
          if (newPageData.length > 0) {
            console.log("newPageData", newPageData);
            setMissingPersonList((prevList) => [...prevList, ...newPageData]);
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleScroll = () => {
    if (
      containerRef.current.scrollTop + containerRef.current.clientHeight >= containerRef.current.scrollHeight - 10 &&
      !loading
    ) {
      setPageNum(pageNum + 1);
    }
  };

  const Filter = () => {
    return (
      <StFilter>
        <FilterWrapper className="radio-custom" defaultValue={""} onChange={onFilterChange} value={filter}>
          <Radio value={""}>전체</Radio>
          <Radio value={"searching"}>탐색중</Radio>
          <Radio value={"exit"}>종료</Radio>
        </FilterWrapper>
      </StFilter>
    );
  };
  const SearchBox = () => {
    return (
      <StSearchBox onFinish={onFinish}>
        <Form.Item name="search">
          <Input
            suffix={<SearchOutlined />}
            placeholder="실종자 입력"
            size="large"
            variant="borderless"
            allowClear
            style={{ borderRadius: "1rem", backgroundColor: "white" }}></Input>
        </Form.Item>
      </StSearchBox>
    );
  };
  return (
    <StMissingPersonListPage>
      <Typography.Title level={3}>실종자 현황</Typography.Title>
      <TopContainer>
        <Filter />
        <SearchBox />
      </TopContainer>
      <ContentsContainer>
        <TopContainer>
          <ExplainText>클릭하면 실종자 리포트 화면으로 이동합니다.</ExplainText>
          <Button type="link" icon={<ReloadOutlined />} disabled={init} onClick={() => onReset()}>
            검색 초기화
          </Button>
        </TopContainer>

        {/* <List grid={{ gutter: 16, column: 4 }}>
          <VirtualList
            data={missingPersonList}
            height={ContainerHeight}
            itemHeight={200}
            itemKey="id"
            onScroll={onScroll}>
            {(item) => (
              <List.Item>
                <CardView key={item.id} data={item} />
              </List.Item>
            )}
          </VirtualList>
        </List> */}

        <CardContainer ref={containerRef} onScroll={handleScroll}>
          <List
            grid={{ gutter: [0, 26] }}
            dataSource={missingPersonList}
            renderItem={(item) => <CardView key={item.id} data={item} />}
            loading={loading}
          />
          {/* {missingPersonList &&
            missingPersonList.map((missingPerson) => {
              return <CardView key={missingPerson.id} data={missingPerson} />;
            })} */}
        </CardContainer>

        {/* <CardView /> */}
      </ContentsContainer>
    </StMissingPersonListPage>
  );
}
export default MissingPersonListPage;

const StMissingPersonListPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 4.4rem 5rem;
  gap: 2rem;
  overflow: hidden;
`;
const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StFilter = styled.div``;

const sharedRadioStyle = `
    border-radius: 10rem;
    padding: 0.5rem 1.9rem;
    font-size: 1.6rem;
`;

const FilterWrapper = styled(Radio.Group)`
  &.radio-custom .ant-radio-wrapper {
    border: 0.1rem solid #8b8b8b;
    border-radius: 10rem;
    padding: 0.5rem 1.9rem;
    color: #8b8b8b;
    background-color: white;
    font-size: 1.6rem;
  }

  &.radio-custom .ant-radio-wrapper-checked {
    border: 0.1rem solid #1890ff;
    background-color: #1890ff;
    color: white;
    ${sharedRadioStyle}
  }

  //기존 라디오 버튼 숨기기
  &.radio-custom .ant-radio {
    position: absolute;
    left: -9999px;
    overflow: hidden;
  }
`;

const StSearchBox = styled(Form)``;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1.8rem 1.4rem 1.4rem 4.4rem;
  gap: 1.6rem;
  border-radius: 1rem;
  background-color: white;
`;

const ExplainText = styled(Text)`
  font-size: 1.2rem;
  color: #8b8b8b;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  flex-basis: 100%;
  gap: 2.6rem;

  width: 100%;
  height: 100%;
  padding-right: 3rem;
  padding-bottom: 10rem;

  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.4rem;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10rem;
    background: #8b8b8b;
  }
`;
