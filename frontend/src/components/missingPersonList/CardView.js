import { Row, Col, Image, Form, Input, Tag } from "antd";
import styled from "styled-components";
import emptyProfile from "../../assets/images/emptyProfile.svg";
import { useEffect, useState } from "react";

export const CardView = ({ data }) => {
  const [form] = Form.useForm();
  const [statusText, setStatusText] = useState("탐색중");
  const [status, setStatus] = useState(false); // [수정

  // 실종자 정보 적용
  useEffect(() => {
    form.setFieldsValue({
      name: data.name,
      birth: data.birthdate,
      gender: data.gender === "남성" ? "남" : "여",
      missingTime: dateForm(data.missingAt),
      missingLocation: data.missingLocation,
    });
    setStatus(data.status === "searching" ? true : false);
    setStatusText(data.status === "searching" ? "탐색중" : "종료");
  }, []);

  const dateForm = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");

    const formattedDate = `${year}.${month}.${day} ${hour}:${minute}경`;
    return formattedDate;
  };

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
                <Badge process={status} text={statusText} />
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
  /* flex-grow: 1; */
`;

const StCardItem = styled(Form)`
  flex-grow: 1;
  width: 32rem;
  height: 20rem;
  padding: 2rem;
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
  background: ${(props) => (props.process ? "#1890FF" : "#dfe9f3")};
  color: white;
`;
