import { useState } from "react";

import styled from "styled-components";
import { Form, Input, DatePicker, TimePicker, Radio, Typography } from "antd";
import { SeacrchBox } from "../common/SearchBox";

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
      message: "Please select time!",
    },
  ],
};
const format = "HH:mm";

export const MissingPersonInfo = () => {
  const [userGender, setUserGender] = useState("male");

  const genderChange = ({ target: { value } }) => {
    console.log("radio3 checked", value);
    setUserGender(value);
  };
  return (
    <Wrapper>
      <Typography.Title
        level={5}
        style={{
          margin: 0,
        }}>
        실종자
      </Typography.Title>
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
