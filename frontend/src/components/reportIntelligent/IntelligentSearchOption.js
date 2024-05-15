import styled from "styled-components";
import { Row, Col, Typography, Form, Button, DatePicker, TimePicker } from "antd";
import moment from "moment";
import { SeacrchBox } from "../common/SearchBox";
import { IntelligentSeacrchBox } from "./IntelligentSearchBox";
const { RangePicker } = DatePicker;

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

export const IntelligentSearchOption = ({ name }) => {
  const [form] = Form.useForm();

  return (
    // <StIntelligentSearchOption>
    //   <Typography.Title
    //     level={5}
    //     style={{
    //       marginBottom: "3rem",
    //     }}>
    //     탐색 시간대/위치 설정
    //   </Typography.Title>
    //   <Form onFinish={onFinish} colon={false} hideRequiredMark={true}>
    //     <Row type="flex" gutter={[0, 6]} style={{ marginBottom: "1.2rem" }}>
    //       <Col span={3}>
    //         <p>시작일</p>
    //       </Col>
    //       <Col span={8}>
    //         <FormItem name={["intelligentSearch", "startDate"]} {...config} label="    ">
    //           <DatePicker placeholder="날짜 입력" />
    //         </FormItem>
    //       </Col>
    //       <Col span={13}>
    //         <FormItem name={["intelligentSearch", "startTime"]} {...config} label="    ">
    //           <TimePicker format="HH:mm" placeholder="시간 입력" />
    //         </FormItem>
    //       </Col>
    //       <Col span={3}>
    //         <p>종료일</p>
    //       </Col>
    //       <Col span={8}>
    //         <FormItem name={["intelligentSearch", "endDate"]} {...config} label="    ">
    //           <DatePicker placeholder="날짜 입력" />
    //         </FormItem>
    //       </Col>
    //       <Col span={13}>
    //         <FormItem name={["intelligentSearch", "endTime"]} {...config} label="    ">
    //           <TimePicker format="HH:mm" placeholder="시간 입력" />
    //         </FormItem>
    //       </Col>
    //     </Row>
    //     <Row gutter={[0, 20]}>
    //       <Col span={3}>
    //         <p>탐색 위치</p>
    //       </Col>
    //       <Col>
    //         <FormItem name={["intelligentSearch", "searchLocation"]} {...config} label="    ">
    //           <SeacrchBox title={"탐색 위치"} />
    //         </FormItem>
    //       </Col>
    //       <Col span={24}>
    //         <ButtonContainer>
    //           <FormItem>
    //             <ButtonWrapper type="primary" htmlType="submit">
    //               탐색시작
    //             </ButtonWrapper>
    //           </FormItem>
    //         </ButtonContainer>
    //       </Col>
    //     </Row>
    //   </Form>
    // </StIntelligentSearchOption>
    <StIntelligentSearchOption>
      <TitleContainer>{name}님의 지능형 탐색</TitleContainer>
      <InputForm form={form}>
        <InputItem name="searchPeriod" label="기간" {...rangeConfig} colon={false} className="form-custom">
          <RangePickerWrapper
            className="custom-range-picker"
            showTime
            format="YYYY-MM-DD HH:mm"
            placeholder={["시작일시", "종료일시"]}
            disabledDate={(d) => !d || d.isAfter(moment())}
            disabledTime={(d) => !d || d.isAfter(moment())}
          />
        </InputItem>
        <InputItem name="searchLocation" label="위치" {...config} colon={false} className="form-custom">
          <IntelligentSeacrchBox title={"탐색 위치"} form={form} name="searchLocation" />
        </InputItem>
        <InputItem>
          <ButtonWrapper type="primary">시작하기</ButtonWrapper>
        </InputItem>
      </InputForm>
    </StIntelligentSearchOption>
  );
};

const StIntelligentSearchOption = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 2rem 2rem 2rem 4rem;
  border-radius: 1.5rem;
  background-color: white;
  //box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
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
  margin-top: 2rem;
  margin-bottom: 0;
  border-radius: 1rem;
  &.ant-btn > span {
    font-size: 1.2rem;
  }
  @media (max-width: 1440px) and (min-width: 1367px), (max-width: 1366px) and (min-width: 1281px) {
    margin-top: 1rem;
  }
  @media (max-width: 1280px) and (min-width: 0px) {
    margin-top: 1.8rem;
  }
`;

const TitleContainer = styled.div`
  font-size: 2.5rem;
  font-weight: bold;

  margin-top: 1rem;
  margin-bottom: 3rem;
  @media (max-width: 1440px) and (min-width: 1367px), (max-width: 1366px) and (min-width: 1281px) {
    margin-top: 0.8rem;
    margin-bottom: 0.8rem;
    font-size: 1.8rem;
  }
  @media (max-width: 1280px) and (min-width: 0px) {
    margin: 0.6rem 0;
    font-size: 1.6rem;
  }
`;

const InputForm = styled(Form)`
  &.ant-form-vertical .ant-form-item-label {
    padding: 0;
  }
`;

const InputItem = styled(Form.Item)`
  margin-bottom: 2rem;
  padding: 0;

  &.form-custom .ant-form-item-label > label {
    margin: 0;
    padding: 0;
    color: #8b8b8b;
    font-size: 1.1rem;
  }
  &.form-custom .ant-form-item-label > label::after {
    margin: 0;
    padding: 0;
  }
  @media (max-width: 1440px) and (min-width: 1367px), (max-width: 1366px) and (min-width: 1281px) {
    margin-bottom: 0.4rem;
  }
  @media (max-width: 1280px) and (min-width: 0px) {
    margin-bottom: 0.4rem;
  }
`;

const RangePickerWrapper = styled(RangePicker)`
  &.ant-picker .ant-picker-input > input {
    font-size: 1.4rem;
    @media (max-width: 1440px) and (min-width: 1367px), (max-width: 1366px) and (min-width: 1281px) {
      font-size: 1.2rem;
    }
    @media (max-width: 1280px) and (min-width: 0px) {
      font-size: 1.2rem;
    }
  }
`;
