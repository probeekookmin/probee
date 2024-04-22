import { Row, Col, Image, Form, Input, Tag } from "antd";
import styled from "styled-components";
import emptyProfile from "../../assets/images/emptyProfile.svg";
import { useEffect, useState } from "react";

export const CardView = () => {
  const [form] = Form.useForm();
  const [status, setStatus] = useState(false); // [수정

  // 실종자 정보 적용
  useEffect(() => {
    form.setFieldsValue({
      name: "홍길동",
      birth: "1999.01.01",
      gender: "남",
      missingTime: "2021.08.01 12:00" + "경",
      missingLocation: "서울시 강남구",
      guardianName: "김영희",
      relation: "부",
      guardianContact: "010-1234-5678",
      status: true,
    });
    setStatus(true);
  }, []);

  const InputForm = ({ label, name }) => {
    return (
      <InpuFormContainer label={label} name={name} colon={false} className="form-custom">
        <InputText variant="borderless" readOnly={true} />
      </InpuFormContainer>
    );
  };

  const Badge = ({ process, text }) => {
    console.log(process);
    return (
      <>
        <BadgeItem bordered={false} process={process}>
          {text}
        </BadgeItem>
      </>
    );
  };

  const CardItem = () => {
    return (
      <StCardItem form={form} process={status}>
        <Row gutter={[13, 10]}>
          <Col span={8}>
            <ProfileImage src={emptyProfile} style={{ width: "8.8rem" }} />
          </Col>
          <Col span={16}>
            <Row>
              <Col span={17}>
                <InputForm label={"성명"} name={"name"} />
              </Col>
              <Col span={7}>
                <InputForm label={"성별"} name={"gender"} />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputForm label={"생년월일"} name={"birth"} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Badge process={status} text={"탐색중"} />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <InputForm label={"실종일시"} name={"missingTime"} />
          </Col>
          <Col span={24}>
            <InputForm label={"실종장소"} name={"missingLocation"} />
          </Col>
        </Row>
      </StCardItem>
    );
  };
  return (
    <StCardView>
      <CardItem />
    </StCardView>
  );
};

const StCardView = styled.div`
  padding-top: 1.6rem;
`;

const StCardItem = styled(Form)`
  width: 32rem;
  height: 20rem;
  padding: 2.1rem;
  background: ${(props) => (props.process ? "#E5F3FF" : "#F9FCFF")};
  border: ${(props) => (props.process ? "0.1rem solid #E5F3FF" : "0.1rem solid #dfe9f3")};
  border-radius: 1rem;
`;

const ProfileImage = styled(Image)`
  width: 8.8rem;
  height: 8.8rem;
`;

const InpuFormContainer = styled(Form.Item)`
  margin: 0;
  &.form-custom .ant-form-item-label > label {
    margin: 0;
    color: #8b8b8b;
    font-size: 1.5rem;
  }
  &.form-custom .ant-form-item-label > label::after {
    margin: 0;
  }
`;

const InputText = styled(Input)`
  padding-left: 0;
  padding-right: 0;
  font-size: 1.5rem;
  font-weight: 500;
`;

const BadgeItem = styled(Tag)`
  padding: 0.1rem 0.9rem;
  border-radius: 10rem;
  font-size: 1.2rem;
  background: ${(props) => (props.process ? "#1890FF" : "white")};
  color: white;
`;
