import styled from "styled-components";
import { InfoCircleFilled } from "@ant-design/icons";
import { Typography } from "antd";
import { AnnotationData } from "./AnnotationData";
const { Text, Link, Paragraph } = Typography;

export const AnnotationInfo = () => {
  const InfoForm = ({ data }) => {
    return (
      <InfoContainer>
        <Typography>
          <TitleContainer>
            <Icon />
            {data.title}
          </TitleContainer>
          <TextContainer>{data.content}</TextContainer>
        </Typography>
      </InfoContainer>
    );
  };
  return (
    <StAnnotationInfo>
      <AnnotationContainer>
        {AnnotationData.filter((data) => data.category === "missingPerson").map((data) => (
          <>
            <InfoForm data={data} />
          </>
        ))}
      </AnnotationContainer>
      <AnnotationContainer>
        {AnnotationData.filter((data) => data.category === "wearing").map((data) => (
          <>
            <InfoForm data={data} />
          </>
        ))}
      </AnnotationContainer>
      <AnnotationContainer>
        {AnnotationData.filter((data) => data.category === "guardian").map((data) => (
          <>
            <InfoForm data={data} />
          </>
        ))}
      </AnnotationContainer>
      <AnnotationContainer>
        {AnnotationData.filter((data) => data.category === "intelligentSearch").map((data) => (
          <>
            <InfoForm data={data} />
          </>
        ))}
      </AnnotationContainer>
    </StAnnotationInfo>
  );
};

const StAnnotationInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 10rem 3rem;
  gap: 7rem;
`;
const AnnotationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: start;
  gap: 0.5rem;
`;

const Icon = styled(InfoCircleFilled)`
  padding-top: 0.3rem;
  color: #1890ff;
`;

const TextContainer = styled.div`
  margin-left: 1rem;
`;
