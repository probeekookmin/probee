import styled from "styled-components";
import { Typography, Select, Skeleton } from "antd";
import { ResultView } from "../common/ResultView";

export const IntelligentSearchResult = () => {
  return (
    <StSearchResult>
      <TopContainer>
        <Typography.Title
          level={5}
          style={{
            margin: 0,
          }}>
          탐색 결과
        </Typography.Title>
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
      </TopContainer>
      <ResultView count={8} column={4} />
    </StSearchResult>
  );
};

const StSearchResult = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.5rem 2rem 2rem 2rem;
  background-color: white;
  border-radius: 0.3rem;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
