import styled from "styled-components";
import { useEffect, useState } from "react";
import { Layout, Form, Row, Col, FloatButton } from "antd";
import { Header } from "antd/es/layout/layout";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { ProfileCard } from "../components/guardianMain/ProfileCard";
import { CustomSteps } from "../components/guardianMain/CustomSteps";
import { getGuardianMissingPerson, getGuardianMissingPersonStep } from "../core/api";

/*의뢰인용 메인화면*/
function GuardianMainPage() {
  const [form] = Form.useForm();
  const [profile, setProfile] = useState(""); // 프로필 이미지
  const [step, setStep] = useState(1);

  useEffect(() => {
    //실종자 정보 가져오기
    getGuardianMissingPerson().then((data) => {
      form.setFieldsValue({
        name: data.missingPeopleName,
        birth: data.birthdate.replace(/-/g, "."), // 1999-01-01 -> 1999.01.01
        wearingInfo: data.query,
      });
      setProfile(data.profileImage);
    });

    //실종자 진행현황 가져오기
    getGuardianMissingPersonStep().then((data) => {
      switch (data.step) {
        case "FIRST":
          setStep(0);
          break;
        case "BETWEEN":
          setStep(1);
          break;
        case "SECOND":
          setStep(2);
          break;
        case "EXIT":
          setStep(3);
          break;
        default:
          setStep(1);
      }
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
            <ProfileCard id={1} profile={profile} />
          </ProfileSection>
        </Col>
        <Col span={24}>
          <CustomSteps currentStep={step} />
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
  /* @media only screen and (max-width: 600px) {
  }
  @media (min-width: 992px) {
    background-color: red;
  } */
`;
const DemoLogo = styled.div`
  width: 10rem;
  height: 3.2rem;
  margin: 1.6rem;
  background: rgba(0, 0, 0, 0.4);
`;

const ProfileSection = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const FloatButtonContainer = styled(FloatButton)`
  &.ant-float-btn .ant-float-btn-body .ant-float-btn-content {
    width: 12.5rem;
    height: 12.5rem;
  }
`;
