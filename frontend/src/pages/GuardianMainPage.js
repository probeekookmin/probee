import { Layout, Form, Row, Col, FloatButton } from "antd";
import { Header } from "antd/es/layout/layout";
import styled from "styled-components";
import { ProfileCard } from "../components/guardianMain/ProfileCard";
import { useEffect } from "react";
import { CustomSteps } from "../components/guardianMain/CustomSteps";
import { QuestionCircleOutlined } from "@ant-design/icons";

function GuardianMainPage() {
  const [form] = Form.useForm();
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
    <StGuardianMainPage>
      <MainHeader>
        <DemoLogo />
      </MainHeader>
      <Row align={"middle"} gutter={[8, 20]}>
        <Col span={24}>
          <ProfileSection form={form}>
            <ProfileCard />
          </ProfileSection>
        </Col>
        <Col span={24}>
          <CustomSteps currentStep={2} />
        </Col>
      </Row>
      <FloatButtonContainer
        icon={<QuestionCircleOutlined style={{ fontSize: "2rem" }} />}
        style={{
          width: "12.5rem",
          height: "12.5rem",
        }}
      />
    </StGuardianMainPage>
  );
}

export default GuardianMainPage;

const StGuardianMainPage = styled(Layout)`
  background-color: white;
`;
const MainHeader = styled(Header)`
  height: 18rem;
  background-color: skyblue;
  @media only screen and (max-width: 600px) {
  }
  @media (min-width: 992px) {
    background-color: red;
  }
`;
const DemoLogo = styled.div`
  width: 10rem;
  height: 3.2rem;
  background: rgba(0, 0, 0, 0.4);
  margin: 1.6rem;
`;

const ProfileSection = styled(Form)`
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const FloatButtonContainer = styled(FloatButton)`
  &.ant-float-btn .ant-float-btn-body .ant-float-btn-content {
    width: 12.5rem;
    height: 12.5rem;
  }
`;
