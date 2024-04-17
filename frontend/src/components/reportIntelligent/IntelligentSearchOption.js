import styled from "styled-components";
import { Row, Col, Typography, Form, Button, DatePicker, TimePicker } from "antd";
import { SeacrchBox } from "../common/SearchBox";
const config = {
  rules: [
    {
      //   type: "object",
      message: "Please select time!",
      required: true,
    },
  ],
};
const rangeConfig = {
  rules: [
    {
      type: "array",
      required: true,
      message: "Please select time!",
    },
  ],
};
const onFinish = (fieldsValue) => {
  const values = {
    ...fieldsValue,
  };
  console.log("Received values of form: ", values);
};

export const IntelligentSearchOption = () => {
  return (
    <StIntelligentSearchOption>
      <Typography.Title
        level={5}
        style={{
          marginBottom: "3rem",
        }}>
        탐색 시간대/위치 설정
      </Typography.Title>
      <Form onFinish={onFinish} colon={false} hideRequiredMark={true}>
        <Row type="flex" gutter={[0, 6]} style={{ marginBottom: "1.2rem" }}>
          <Col span={3}>
            <p>시작일</p>
          </Col>
          <Col span={8}>
            <FormItem name={["intelligentSearch", "startDate"]} {...config} label="    ">
              <DatePicker placeholder="날짜 입력" />
            </FormItem>
          </Col>
          <Col span={13}>
            <FormItem name={["intelligentSearch", "startTime"]} {...config} label="    ">
              <TimePicker format="HH:mm" placeholder="시간 입력" />
            </FormItem>
          </Col>
          <Col span={3}>
            <p>종료일</p>
          </Col>
          <Col span={8}>
            <FormItem name={["intelligentSearch", "endDate"]} {...config} label="    ">
              <DatePicker placeholder="날짜 입력" />
            </FormItem>
          </Col>
          <Col span={13}>
            <FormItem name={["intelligentSearch", "endTime"]} {...config} label="    ">
              <TimePicker format="HH:mm" placeholder="시간 입력" />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={[0, 20]}>
          <Col span={3}>
            <p>탐색 위치</p>
          </Col>
          <Col>
            <FormItem name={["intelligentSearch", "searchLocation"]} {...config} label="    ">
              <SeacrchBox title={"탐색 위치"} />
            </FormItem>
          </Col>
          <Col span={24}>
            <ButtonContainer>
              <FormItem>
                <ButtonWrapper type="primary" htmlType="submit">
                  탐색시작
                </ButtonWrapper>
              </FormItem>
            </ButtonContainer>
          </Col>
        </Row>
      </Form>
    </StIntelligentSearchOption>
  );
};

const StIntelligentSearchOption = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem 2rem 1rem 2rem;
  background-color: white;
`;

const FormItem = styled(Form.Item)`
  margin-bottom: 0;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
`;

const ButtonWrapper = styled(Button)`
  margin-bottom: 0;
`;
