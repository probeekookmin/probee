import { Form, Input } from "antd";
import styled from "styled-components";

export const InputForm = ({ label, value }) => {
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <InputItem>
        <InputField variant="borderless" value={value} readOnly={"true"} />
      </InputItem>
    </>
  );
};

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

const InputField = styled(Input)`
  padding-left: 0rem;
`;
