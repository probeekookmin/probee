import { useState } from "react";

import styled from "styled-components";
import { Divider, Button, Form, Input, DatePicker, TimePicker, Radio } from "antd";
import { SeacrchBox } from "../components/common/SearchBox";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
const options = [
  {
    label: "남성",
    value: "male",
  },
  {
    label: "여성",
    value: "female",
  },
];
const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};
const format = "HH:mm";
const onFinish = (values) => {
  console.log(values);
};

function AddMissingPersonPage() {
  const [userGender, setUserGender] = useState("male");

  const genderChange = ({ target: { value } }) => {
    console.log("radio3 checked", value);
    setUserGender(value);
  };
  const MissingPersonInfo = () => {
    return (
      <Wrapper>
        <p>실종자</p>
        <Col>
          <Row>
            <Form.Item
              name={["user", "name"]}
              label="성명"
              rules={[
                {
                  required: true,
                },
              ]}>
              <NameInput />
            </Form.Item>
            <Form.Item
              name={["user", "gender"]}
              label="성별"
              rules={[
                {
                  required: true,
                },
              ]}>
              <Radio.Group options={options} onChange={genderChange} value={userGender} optionType="button" />
            </Form.Item>

            <Form.Item name="date-picker" label="생년월일" {...config}>
              <DatePicker />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item name={["user", "missingLocation"]} label="실종위치">
              <SeacrchBox />
            </Form.Item>
            <Form.Item name={["user", "missingTime"]} label="실종시간" {...config}>
              <TimePicker format={format} />
            </Form.Item>
          </Row>

          <Form.Item name={["user", "introduction"]} label="특이사항">
            <TextArea />
          </Form.Item>
        </Col>
      </Wrapper>
    );
  };

  return (
    <StAddMissingPersonPage>
      <InfoForm
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        // style={{
        //   maxWidth: 734,
        // }}
        validateMessages={validateMessages}>
        <Container>
          <p>실종자 정보 등록</p>
          <Divider />

          <MissingPersonInfo />
        </Container>

        <Form.Item wrapperCol={{}}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </InfoForm>
    </StAddMissingPersonPage>
  );
}
export default AddMissingPersonPage;

const StAddMissingPersonPage = styled.div`
  padding: 3rem;
`;
const InfoForm = styled(Form)`
  max-width: 45.9rem;
`;

// 전체 form의 container (흰 배경)
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 1.25rem;
  background-color: white;
`;

// 각 정보 입력 영역
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0rem;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  gap: 5.62rem;
`;

const NameInput = styled(Input)`
  width: 12.2rem;
`;

const TextArea = styled(Input.TextArea)`
  width: 25.1rem;
`;
