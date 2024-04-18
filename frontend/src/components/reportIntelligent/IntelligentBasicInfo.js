import styled from "styled-components";
import { Row, Col, Typography, Divider, Form, Skeleton } from "antd";
import { useEffect } from "react";
import { InputForm, TextAreaForm } from "../common/InputForm";

export const IntelligentBasicInfo = () => {
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
      wearingInfo: "짧은 흑발. 어두운 반팔 셔츠와 어두운 반바지를 입고, 가방을 들고 있음.",
    });
  }, []);

  return (
    <StIntelligentBasicInfo>
      <Form form={form} layout="vertical">
        <Row gutter={15}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Typography.Title level={5}>실종자 정보 </Typography.Title>
              </Col>
              <Col span={11}>
                <Skeleton.Image active={false} style={{ width: "13rem", height: "16rem" }} />
              </Col>
              <Col span={13}>
                <Row>
                  <Col span={24}>
                    <InputForm label={"성명"} name={"name"} />
                  </Col>
                  <Col span={17}>
                    <InputForm label={"생년월일"} name={"birth"} />
                  </Col>
                  <Col span={7}>
                    <InputForm label={"성별"} name={"gender"} />
                  </Col>
                  <Col span={24}>
                    <InputForm label={"실종일시"} name={"missingTime"} />
                  </Col>
                  <Col span={24}>
                    <InputForm label={"실종장소"} name={"missingLocation"} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={1}>
            <Divider type="vertical" style={{ height: "100%" }} />
          </Col>

          <Col span={10}>
            <Col>
              <Typography.Title level={5}>착장정보</Typography.Title>
            </Col>
            <Col>
              <TextAreaForm name={"wearingInfo"} />
            </Col>
          </Col>
        </Row>

        {/* <Col span={11}>
          <Typography.Title
            level={5}
            style={{
              margin: 0,
            }}>
            착장정보
          </Typography.Title>
        </Col> */}
      </Form>
    </StIntelligentBasicInfo>
  );
};

const StIntelligentBasicInfo = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  background-color: white;
`;

const InfoForm = styled(Form)`
  display: flex;
`;
