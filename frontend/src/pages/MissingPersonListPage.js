import { Input, Typography } from "antd";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
const { Text, Link } = Typography;

function MissingPersonListPage() {
  const SearchBox = () => {
    return (
      <StSearchBox>
        <Input
          suffix={<SearchOutlined />}
          placeholder="실종자 입력"
          size="large"
          variant="borderless"
          style={{ borderRadius: "1rem", backgroundColor: "white" }}></Input>
      </StSearchBox>
    );
  };
  return (
    <StMissingPersonListPage>
      <Typography.Title level={3}>실종자 현황</Typography.Title>
      <TopContainer>
        <SearchBox />
      </TopContainer>
      <ContentsContainer>
        <ExplainText>클릭하면 실종자 리포트 화면으로 이동합니다.</ExplainText>
      </ContentsContainer>
    </StMissingPersonListPage>
  );
}
export default MissingPersonListPage;

const StMissingPersonListPage = styled.div`
  width: 100%;
  height: 100%;
  padding: 4.4rem 5rem;
`;
const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StSearchBox = styled.div``;

const ContentsContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: white;
`;

const ExplainText = styled(Text)`
  font-size: 1.2rem;
  color: #8b8b8b;
`;
