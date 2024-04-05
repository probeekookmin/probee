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
          {/* <Skeleton.Image active={false} style={{ width: "8rem", height: "10.8rem" }} />
          <MissingPersonInfoContainer>
            <InputForm label={"성명"} name={"name"} />
            <Row gap={"1.38rem"}>
              <InputForm label={"생년월일"} name={"birth"} />
              <InputForm label={"성별"} name={"gender"} />
            </Row>
            <InputForm label={"실종일시"} name={"missingTime"} />
            <InputForm label={"실종장소"} name={"missingLocation"} />
          </MissingPersonInfoContainer> */}

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
          {/* <Row gap={"1.19rem"}>
            <InputForm label={"보호자명"} name={"guardianName"} />
            <InputForm label={"관계"} name={"relation"} />
            <InputForm label={"보호자 연락처"} name={"guardianContact"} />
          </Row> */}
          <Row guther={"1.2rem"}>
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

  return (
    <StBasicInfo>
      <MissingPersonInfo />
      <GuardianInfo />
    </StBasicInfo>
  );
};

const StBasicInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 1.25rem;

  width: 22.56rem;
  height: 27.5rem;

  background-color: white;
`;

const InfoContainer = styled.div`
  gap: 0.5rem;
  margin-bottom: 1rem;
`;
// const Row = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: ${(props) => props.gap};
// `;

const InfoForm = styled(Form)`
  display: flex;
`;

// 실종자 정보 영역
const MissingPersonForm = styled(Form)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1.25rem;
`;
// const MissingPersonInfoContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.38rem;
// `;
