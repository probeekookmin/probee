import styled from "styled-components";
import { Typography, Select, Skeleton } from "antd";
import { ResultView } from "../common/ResultView";
import { IntelligentResultView } from "./IntelligentResultView";

export const IntelligentSearchResult = () => {
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
      <IntelligentResultView />
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
