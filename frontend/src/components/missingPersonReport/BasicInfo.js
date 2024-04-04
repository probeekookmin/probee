import { Typography, Image, Skeleton, Form, Input } from "antd";
import styled from "styled-components";

export const BasicInfo = () => {
  const InputField = ({ label, value }) => {
    return (
      <>
        <InputLabel>{label}</InputLabel>{" "}
        <InputItem>
          <InputTextField variant="borderless" value={value} readOnly={"true"} />
        </InputItem>
      </>
    );
  };
  const MissingPersonInfo = () => {
    return (
      <InfoContainer>
        <Typography.Title level={5}>실종자 정보</Typography.Title>
        <MissingPersonForm layout="vertical">
          <Skeleton.Image active={false} style={{ width: "8rem", height: "10rem" }} />
          <MissingPersonInfoContainer>
            <InputField label={"성명"} value={"홍길동"} />
          </MissingPersonInfoContainer>
        </MissingPersonForm>
      </InfoContainer>
    );
  };

  return (
    <StBasicInfo>
      <MissingPersonInfo />
    </StBasicInfo>
  );
};

const StBasicInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.25rem;

  width: 22.56rem;
  height: 27.5rem;

  background-color: white;
`;

const InfoContainer = styled.div`
  gap: 0.38rem;
`;

/* 각 정보 input 영역 */
const InputItem = styled(Form.Item)`
  padding-bottom: 0;

  .ant-form-item .ant-form-item-label {
    padding-bottom: 0;
  }
`;

const InputLabel = styled.span`
  padding-bottom: 0;
  color: #00000060;
  font-size: 0.56rem;
`;

const InputTextField = styled(Input)`
  padding-left: 0rem;
`;

// 실종자 정보 영역
const MissingPersonForm = styled(Form)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const MissingPersonInfoContainer = styled.div``;
