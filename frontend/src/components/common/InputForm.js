import styled from "styled-components";
import { Form, Input } from "antd";

export const InputForm = ({ label, name }) => {
  return (
    <StInputForm>
      <InputLabel>{label}</InputLabel>
      <InputItem name={name}>
        <InputField variant="borderless" readOnly={true} />
      </InputItem>
    </StInputForm>
  );
};

export const CenterInputForm = ({ label, name }) => {
  return (
    <StCenterInputForm>
      <InputLabel>{label}</InputLabel>
      <InputItem name={name}>
        <InputField variant="borderless" readOnly={true} />
      </InputItem>
    </StCenterInputForm>
  );
};

/* 각 정보 input 영역 */
const StInputForm = styled.div`
  display: flex;
  flex-direction: column;
  height: 3.9rem;
  margin-bottom: 0.6rem;
  @media all and (max-width: 1536px) {
    height: 3.2rem;
  }
`;
const InputItem = styled(Form.Item)`
  padding: 0;
  margin: 0;
  height: 2.2rem;
  min-height: 0rem;
`;

const InputLabel = styled.span`
  padding-bottom: 0;
  color: #00000060;
  font-size: 1rem;
  @media all and (max-width: 1536px) {
    font-size: 0.9rem;
  }
`;

const InputField = styled(Input)`
  padding: 0;
  color: black;
  font-size: 1.4rem;
  line-height: 2.2rem;
  margin-bottom: 0.6rem;
  @media all and (max-width: 1536px) {
    font-size: 1.3rem;
  }
`;

const StCenterInputForm = styled(StInputForm)`
  align-items: center;
`;
