import { Layout, Form, Row, Col } from "antd";
import { Header } from "antd/es/layout/layout";
import styled from "styled-components";
import { ProfileCard } from "../components/guardianMain/ProfileCard";
import { useEffect } from "react";
import { MainSteps } from "../components/guardianMain/MainSteps";

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
      <Row align={"middle"}>
        <Col span={24}>
          <ProfileSection form={form}>
            <ProfileCard />
          </ProfileSection>
        </Col>
        <Col>
          <MainSteps />
        </Col>
      </Row>
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
