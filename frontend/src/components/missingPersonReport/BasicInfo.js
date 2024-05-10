import { Typography, Image, Skeleton, Form, Input, Row, Col } from "antd";
import styled from "styled-components";
import { InputForm } from "../common/InputForm";
import { useEffect } from "react";

export const BasicInfo = ({ data }) => {
  const [form] = Form.useForm();
  console.log("data", data);
  // 실종자 정보 적용
  useEffect(() => {
    form.setFieldsValue({
      name: data.missingPeopleName,
      birth: data.birthdate,
      gender: data.gender,
      missingTime: String(data.missingAt).split("T")[0]+" "+String(String(data.missingAt).split("T")[1]).split(":")[0]+"시 경", // todo :함수화 필요
      missingLocation: data.missingLocation,
      guardianName: data.guardianName,
      relation: data.relationship,
      guardianContact: data.phoneNumber,
      koQuery : data.koQuery //착장정보 한국어
    });
  }, []);

  /* 실종자 정보 영역 */
  const MissingPersonInfo = () => {
    return (
      <InfoContainer>
        <Typography.Title level={5}>실종자 정보</Typography.Title>
        <MissingPersonForm form={form} layout="vertical">
          <Row>
            <Col span={11}>
              {/* <Skeleton.Image active={false} style={{ width: "13rem", height: "16rem" }} /> */}
              {data.profileImage ? (
                <img src={data.profileImage} alt="Profile" style={{ width: "13rem", height: "16rem" }} />
              ) : (
                <Skeleton.Image active={false} style={{ width: "13rem", height: "16rem" }} />
              )}
            </Col>
            <Col span={13}>
              <InputForm label={"성명"} name={"name"} />
              <Row>
                <Col span={16}>
                  <InputForm label={"생년월일"} name={"birth"} />
                </Col>
                <Col span={8}>
                  <InputForm label={"성별"} name={"gender"} />
                </Col>
              </Row>
              <InputForm label={"실종일시"} name={"missingTime"} />
              <InputForm label={"실종장소"} name={"missingLocation"} />
            </Col>
          </Row>
        </MissingPersonForm>
      </InfoContainer>
    );
  };

  /* 보호자 정보 영역 */
  const GuardianInfo = () => {
    return (
      <InfoContainer>
        <Typography.Title level={5}>보호자 정보</Typography.Title>
        <InfoForm form={form} layout="vertical">
          <Row>
            <Col span={7}>
              <InputForm label={"보호자명"} name={"guardianName"} />
            </Col>
            <Col span={4}>
              <InputForm label={"관계"} name={"relation"} />
            </Col>
            <Col span={13}>
              <InputForm label={"보호자 연락처"} name={"guardianContact"} />
            </Col>
          </Row>
        </InfoForm>
      </InfoContainer>
    );
  };

  /* 착장정보 영역 */
  const WearingInfo = () => {
    return (
      <InfoContainer>
        <Typography.Title level={5}>착장 정보</Typography.Title>
        <InfoForm form={form} layout="vertical">
          <Row>
            <Col span={24}>
              <StyledParagraph>{data.koQuery}</StyledParagraph>
            </Col>
          </Row>
        </InfoForm>
      </InfoContainer>
    );
  };
  return (
    <StBasicInfo>
      <MissingPersonInfo />
      <GuardianInfo />
      <WearingInfo />
    </StBasicInfo>
  );
};

const StBasicInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 1rem 1.5rem;
  gap: 0.6rem;

  //width: 36rem;
  height: 42.8rem;

  background-color: white;
`;

const InfoContainer = styled.div``;

const InfoForm = styled(Form)`
  display: flex;
`;

// 실종자 정보 영역
const MissingPersonForm = styled(Form)``;

//어떻게든 쿼리 보이게 해보려고 임시로 넣은 코드 - 종빈
const StyledParagraph = styled.p`
  margin-bottom: 0.5rem;
  white-space: pre-wrap; /* Preserve line breaks */
`;