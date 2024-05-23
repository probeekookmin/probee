import styled from "styled-components";
import { Row, Col, Typography, Divider, Form, Skeleton, Image } from "antd";
import { useEffect } from "react";
import { HorizontalInputForm, InputForm } from "../common/InputForm";

export const IntelligentBasicInfo = ({ data }) => {
  const [form] = Form.useForm();

  // 실종자 정보 적용
  useEffect(() => {
    form.setFieldsValue({
      name: data.missingPeopleName,
      birth: data.birthdate,
      gender: data.gender == "woman" ? "여성" : "남성",
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
    });
  }, [data]);

  return (
    <StIntelligentBasicInfo>
      <Title>실종자 정보</Title>
      <InfoForm form={form}>
        <ImageContainer>
          {data.profileImage ? (
            <ImageWrapper className="custom-image" src={data.profileImage} alt="Profile" />
          ) : (
            <Skeleton.Image active={false} />
          )}
        </ImageContainer>
        <ContentsContainer>
          <Row style={{ width: "100%" }}>
            {/* <Col span={13}>
              <HorizontalInputForm label={"성명"} name={"name"} />
            </Col> */}
            <Col span={11}>
              <HorizontalInputForm label={"성별"} name={"gender"} />
            </Col>
            <Col span={13}>
              <HorizontalInputForm label={"생년월일"} name={"birth"} />
            </Col>
            <Col span={24}>
              <HorizontalInputForm label={"실종일시"} name={"missingTime"} />
            </Col>

            <Col span={24}>
              {" "}
              <HorizontalInputForm label={"실종장소"} name={"missingLocation"} />
            </Col>
          </Row>
          <ContentsDivider />
          <HorizontalInputForm label={""} name={"koQuery"} lines={true} />
        </ContentsContainer>
      </InfoForm>
    </StIntelligentBasicInfo>
  );
};

const StIntelligentBasicInfo = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  border-radius: 1.5rem;
  background-color: white;
  @media all and (max-width: 1536px) {
    padding: 1rem 2rem;
  }
`;
const Title = styled.p`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.8rem;
  font-weight: 600;
  @media all and (max-width: 1500px) {
    font-size: 1.3rem;
  }
`;
const InfoForm = styled(Form)`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  width: 100%;
  gap: 2rem;
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

    @media (max-width: 1440px) and (min-width: 1367px), (max-width: 1366px) and (min-width: 1281px) {
      width: 11.2rem;
      height: 13.6rem;
    }
    @media (max-width: 1280px) and (min-width: 0px) {
      width: 9.8rem;
      height: 11.8rem;
    }
  }
  &.custom-image.ant-image {
    width: 14rem;
    height: 17rem;

    @media (max-width: 1440px) and (min-width: 1367px), (max-width: 1366px) and (min-width: 1281px) {
      width: 11.2rem;
      height: 13.6rem;
    }
    @media (max-width: 1280px) and (min-width: 0px) {
      width: 9.8rem;
      height: 11.8rem;
    }
  }
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentsDivider = styled(Divider)`
  &.ant-divider-horizontal {
  }
  margin: 1rem;
  @media all and (max-width: 1536px) {
    margin: 0;
  }
`;
