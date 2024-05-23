import styled from "styled-components";
import { useEffect } from "react";
import { Typography, Image, Skeleton, Form, Input, Row, Col, Divider } from "antd";
import { InputForm } from "../common/InputForm";

export const BasicInfo = ({ data }) => {
  const [form] = Form.useForm();
  console.log("BasicInfo", data);

  // 실종자 정보 적용
  useEffect(() => {
    console.log("BasicInfo-useEffect", data);
    form.setFieldsValue({
      name: data.missingPeopleName,
      birth: data.birthdate,
      gender: data.gender == "man" ? "남성" : "여성",
      missingTime:
        String(data.missingAt).split("T")[0] +
        " " +
        String(String(data.missingAt).split("T")[1]).split(":")[0] +
        "시 경", // todo :함수화 필요
      missingLocation: data.missingLocation,
      guardianName: data.guardianName,
      relation: data.relationship,
      guardianContact: data.phoneNumber,
      koQuery: data.koQuery, //착장정보 한국어
      description: data.description, //특이사항
    });
  }, [data]);

  /* 실종자 정보 영역 */
  const MissingPersonInfo = () => {
    return (
      <InfoContainer>
        <Title>실종자 정보</Title>
        <MissingPersonForm form={form} layout="vertical">
          <ImageContainer>
            {data.profileImage ? (
              <ImageWrapper className="custom-image" src={data.profileImage} alt="Profile" />
            ) : (
              <Skeleton.Image active={false} />
            )}
          </ImageContainer>
          <ContentsContainer>
            <Row gutter={8} style={{ width: "100%" }}>
              <Col span={24}>
                <InputForm label={"성명"} name={"name"} />
              </Col>
              <Col span={14}>
                <InputForm label={"생년월일"} name={"birth"} />
              </Col>
              <Col span={10}>
                <InputForm label={"성별"} name={"gender"} />
              </Col>
              <Col span={24}>
                <InputForm label={"실종일시"} name={"missingTime"} />
              </Col>
              <Col span={24}>
                <InputForm label={"실종장소"} name={"missingLocation"} />
              </Col>
            </Row>
          </ContentsContainer>
        </MissingPersonForm>
      </InfoContainer>
    );
  };

  /* 보호자 정보 영역 */
  const GuardianInfo = () => {
    return (
      <InfoContainer>
        <Title>보호자 정보</Title>
        <InfoForm form={form} layout="vertical">
          <GuardianContentsContainer>
            <InputForm label={"보호자명"} name={"guardianName"} />
            <InputForm label={"관계"} name={"relation"} />
            <InputForm label={"보호자 연락처"} name={"guardianContact"} />
          </GuardianContentsContainer>
        </InfoForm>
      </InfoContainer>
    );
  };

  /* 착장정보 영역 */
  const WearingInfo = () => {
    return (
      <InfoContainer>
        <Title>착장 정보</Title>
        <InfoForm form={form} layout="vertical">
          <StyledParagraph>{data.koQuery}</StyledParagraph>
        </InfoForm>
      </InfoContainer>
    );
  };

  /* 특이사항 영역 */
  const DescInfo = () => {
    return (
      <InfoContainer>
        <Title>특이사항</Title>
        <InfoForm form={form} layout="vertical">
          <StyledParagraph>{data.description}</StyledParagraph>
        </InfoForm>
      </InfoContainer>
    );
  };

  return (
    <StBasicInfo>
      <MissingPersonInfo />
      <WearingInfo />
      <DescInfo />
      <CustomDevider />
      <GuardianInfo />
    </StBasicInfo>
  );
};

const StBasicInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  flex: 1;
  width: 100%;
  height: 100%;

  padding: 1.5rem 1.5rem;

  border-radius: 1rem;
  background-color: white;

  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-snap-align: center;
  @media all and (max-width: 1536px) {
    padding: 1rem 1.5rem;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media all and (min-width: 1680px) {
    margin-bottom: 2rem;
  }
  @media all and (max-width: 1536px) {
    margin-bottom: 0.1rem;
  }
`;

const InfoForm = styled(Form)`
  display: flex;
`;

// 실종자 정보 영역
const MissingPersonForm = styled(Form)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 2rem;
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

//어떻게든 쿼리 보이게 해보려고 임시로 넣은 코드 - 종빈
const StyledParagraph = styled.p`
  margin-bottom: 0.5rem;
  white-space: pre-wrap; /* Preserve line breaks */
  font-size: 1.4rem;
  @media (max-width: 1440px) and (min-width: 1367px), (max-width: 1366px) and (min-width: 1281px) {
    margin-bottom: 0.4rem;

    font-size: 1.1rem;
  }
  @media (max-width: 1280px) and (min-width: 0px) {
    font-size: 0.9rem;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  width: 14rem;
  height: 17rem;
  @media all and (max-width: 1536px) {
    width: 12rem;
    height: 15rem;
    object-fit: cover;
  }
`;

const ImageWrapper = styled(Image)`
  &.custom-image {
    width: 14rem;
    height: 17rem;
    object-fit: cover;

    @media all and (max-width: 1536px) {
      width: 12rem;
      height: 15rem;
      object-fit: cover;
    }
  }
  &.custom-image.ant-imag {
    width: 14rem;
    height: 17rem;
    @media all and (max-width: 1536px) {
      width: 12rem;
      height: 15rem;
      object-fit: cover;
    }
  }
`;

const ContentsContainer = styled.div`
  display: flex;
  max-width: 17rem;
`;

const GuardianContentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CustomDevider = styled(Divider)`
  margin: 1rem 0;
  color: #cacaca;
`;
