import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, Button, Form, Typography, Row, Col } from "antd";
import { MissingPersonInfo } from "../components/addMisingPerson/MissingPersonInfo";
import { GuardianInfo } from "../components/addMisingPerson/GuardianInfo";
import { IntelligentSearchInfo } from "../components/addMisingPerson/IntelligentSearchInfo";
import { WearingInfo } from "../components/addMisingPerson/WearingInfo";
import { postMissingPerson } from "../core/api";
import { AnnotationInfo } from "../components/addMisingPerson/AnnotationInfo";
import moment from "moment";

const validateMessages = {
  required: "필수 항목입니다!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

function AddMissingPersonPage() {
  const [form] = Form.useForm();
  const [latlng, setLatlng] = useState({});

  const navigate = useNavigate();

  const getLocation = (latlng) => {
    setLatlng(latlng);
    console.log("latlng", latlng);
  };

  const onFinish = (fieldsValue) => {
    console.log("Received values of form: ", moment().format("YYYY-MM-DDTHH:mm"));
    console.log("gender", fieldsValue["user"]["missingTime"]);
    const today = moment().subtract(1, "minute").format("YYYY-MM-DDTHH:mm");

    const values = {
      missingPeopleName: fieldsValue["user"]["name"],
      birthdate: fieldsValue["user"]["birth"].format("YYYY-MM-DD"),
      gender: fieldsValue["user"]["gender"],
      missingAt:
        (fieldsValue["user"]["missingTime"] != undefined &&
          fieldsValue["user"]["missingTime"].format("YYYY-MM-DD") +
            "T" +
            fieldsValue["user"]["missingTime"].format("HH:mm")) ||
        today,
      missingLocation: fieldsValue["missingLocation"] || "-",
      description: fieldsValue["user"]["introduction"] || "없음.",
      hairStyle: (fieldsValue["hair"] != "" && fieldsValue["hair"]) || "없음",
      topType: (fieldsValue["topType"] != "" && fieldsValue["topType"]) || "없음",
      topColor: (fieldsValue["topColor"] != "" && fieldsValue["topColor"]) || "없음",
      bottomType: (fieldsValue["bottomType"] != "" && fieldsValue["bottomType"]) || "없음",
      bottomColor: (fieldsValue["bottomColor"] != "" && fieldsValue["bottomColor"]) || "없음",
      bagType: (fieldsValue["bag"] != "" && fieldsValue["bag"]) || "없음",
      guardianName: fieldsValue["guardian"]["name"],
      relationship: fieldsValue["guardian"]["relation"],
      phoneNumber: fieldsValue["guardian"]["contact"],
      startTime:
        fieldsValue["searchPeriod"][0].format("YYYY-MM-DD") + "T" + fieldsValue["searchPeriod"][0].format("HH:mm"),
      endTime:
        fieldsValue["searchPeriod"][1].format("YYYY-MM-DD") + "T" + fieldsValue["searchPeriod"][1].format("HH:mm"),
      latitude: 37.610763,
      longitude: 126.994437,
      locationAddress: fieldsValue["searchLocation"],
      missingPeopleType: fieldsValue["user"]["type"],
    };
    console.log("Received values of form: ", values);
    postMissingPerson(values).then((res) => {
      console.log("postMissingPerson", res);
      navigate("/report", { state: { userId: res.id } });
    });
  };

  return (
    <StAddMissingPersonPage>
      <Row>
        <Col span={15}>
          <InfoForm
            layout="vertical"
            form={form}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}>
            <Container>
              <Typography.Title
                level={3}
                style={{
                  margin: 0,
                }}>
                실종자 정보 등록
              </Typography.Title>
              <Divider />
              <MissingPersonInfo form={form} />
              <ContentsDivider />
              <WearingInfo form={form} />
              <ContentsDivider />
              <GuardianInfo />
            </Container>
            <Container>
              <Typography.Title
                level={3}
                style={{
                  margin: 0,
                }}>
                지능형 탐색 초기 정보 등록
              </Typography.Title>
              <Divider />
              <IntelligentSearchInfo form={form} getLocation={getLocation} />
            </Container>
            <ButtonContainer>
              <Form.Item wrapperCol={{}}>
                <Button type="primary" htmlType="submit">
                  정보 등록
                </Button>
              </Form.Item>
            </ButtonContainer>
          </InfoForm>
        </Col>
        <Col span={9}>
          <AnnotationInfo />
        </Col>
      </Row>
    </StAddMissingPersonPage>
  );
}
export default AddMissingPersonPage;

const StAddMissingPersonPage = styled.div`
  width: 100%;
  height: 100vh;
  padding: 3rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 1.8rem;
  }
  &::-webkit-scrollbar-thumb {
    border: 0.5rem solid #f5f5f5;
    border-radius: 10rem;
    background: #8b8b8b;
  }
`;
const InfoForm = styled(Form)`
  //max-width: 45.9rem;
`;

// 전체 form의 container (흰 배경)
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 2rem;
  margin-bottom: 2rem;
  background-color: white;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
`;

const ContentsDivider = styled(Divider)`
  margin-top: 0;
  margin-bottom: 3rem;
`;
