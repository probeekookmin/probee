import { Typography, Image, Skeleton, Form, Input, Row, Col } from "antd";
import styled from "styled-components";
import { InputForm } from "../common/InputForm";
import { useEffect } from "react";

export const BasicInfo = () => {
  const [form] = Form.useForm();

  // 실종자 정보 적용
  useEffect(() => {
    form.setFieldsValue({
      name: "홍길동",
      birth: "1999.01.01",
      gender: "남성",
      missingTime: "2021.08.01 12:00" + "경",
      missingLocation: "서울시 강남구",
      guardianName: "김영희",
      relation: "부",
      guardianContact: "010-1234-5678",
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
              <Skeleton.Image active={false} style={{ width: "8rem", height: "10.8rem" }} />
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
          <Skeleton title={false} />
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
  padding: 1rem 1.25rem;
  gap: 0.38rem;

  width: 22.56rem;
  height: 27.5rem;

  background-color: white;
`;

const InfoContainer = styled.div``;

const InfoForm = styled(Form)`
  display: flex;
`;

// 실종자 정보 영역
const MissingPersonForm = styled(Form)``;
