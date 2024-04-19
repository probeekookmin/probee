import { Input, Typography } from "antd";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";

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
    </StMissingPersonListPage>
  );
}
export default MissingPersonListPage;

const StMissingPersonListPage = styled.div``;
const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StSearchBox = styled.div``;
