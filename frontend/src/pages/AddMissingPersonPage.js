import styled from "styled-components";
import { Divider, Button, Form, Typography, Row, Col } from "antd";
import { MissingPersonInfo } from "../components/addMisingPerson/MissingPersonInfo";
import { GuardianInfo } from "../components/addMisingPerson/GuardianInfo";
import { IntelligentSearchInfo } from "../components/addMisingPerson/IntelligentSearchInfo";
import { WearingInfo } from "../components/addMisingPerson/WearingInfo";
import { postMissingPerson } from "../core/api";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const onFinish = (fieldsValue) => {
    console.log("gender", fieldsValue["user"]["gender"]);
    const values = {
      missingPeopleName: fieldsValue["user"]["name"],
      birthdate: fieldsValue["user"]["birth"].format("YYYY-MM-DD"),
      gender: fieldsValue["user"]["gender"],
      missingAt:
        (fieldsValue["user"]["missingTime"] &&
          fieldsValue["user"]["missingTime"].format("YYYY-MM-DD") +
            "T" +
            fieldsValue["user"]["missingTime"].format("HH:mm")) ||
        "",
      missingLocation: fieldsValue["missingLocation"] || "서울 성북구 정릉로 77",
      description: fieldsValue["user"]["introduction"] || "특이사항 없음",
      hairStyle: (fieldsValue["hair"] != "" && fieldsValue["hair"]) || "긴 머리",
      topType: (fieldsValue["topType"] != "" && fieldsValue["topType"]) || "반팔",
      topColor: (fieldsValue["topColor"] != "" && fieldsValue["topColor"]) || "흰색",
      bottomType: (fieldsValue["bottomType"] != "" && fieldsValue["bottomType"]) || "반바지",
      bottomColor: (fieldsValue["bottomColor"] != "" && fieldsValue["bottomColor"]) || "분홍",
      bagType: (fieldsValue["bag"] != "" && fieldsValue["bag"]) || "없음",
      guardianName: fieldsValue["guardian"]["name"],
      relationship: fieldsValue["guardian"]["relation"],
      phoneNumber: fieldsValue["guardian"]["contact"],
      startTime:
        fieldsValue["searchPeriod"][0].format("YYYY-MM-DD") + "T" + fieldsValue["searchPeriod"][0].format("HH:mm"),
      endTime:
        fieldsValue["searchPeriod"][1].format("YYYY-MM-DD") + "T" + fieldsValue["searchPeriod"][1].format("HH:mm"),
      latitude: 37.610767,
      longitude: 126.996967,
      locationAddress: fieldsValue["searchLocation"] || "서울 성북구 정릉로 77",
      shoesColor: "빨강",
      missingPeopleType: "아동",
    };
    console.log("Received values of form: ", values);
    postMissingPerson(values);
    navigate("/list");
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
              <WearingInfo form={form} />
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
              <IntelligentSearchInfo form={form} />
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
        <Col span={9}></Col>
      </Row>
    </StAddMissingPersonPage>
  );
}
export default AddMissingPersonPage;

const StAddMissingPersonPage = styled.div`
  padding: 3rem;
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
