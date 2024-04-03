import styled from "styled-components";
import { Form, Input, Typography } from "antd";

export const GuardianInfo = () => {
  return (
    <Wrapper>
      <Typography.Title
        level={5}
        style={{
          margin: 0,
        }}>
        보호자(신고자)
      </Typography.Title>
      <Row>
        <Form.Item
          name={["guardian", "name"]}
          label="성명"
          rules={[
            {
              required: true,
            },
          ]}>
          <NameInput />
        </Form.Item>
        <Form.Item
          name={["guardian", "relation"]}
          label="실종자와의 관계"
          rules={[
            {
              required: true,
            },
          ]}>
          <RelationInput />
        </Form.Item>
        <Form.Item
          name={["guardian", "contact"]}
          label="연락처"
          rules={[
            {
              required: true,
            },
          ]}>
          <ContactInput />
        </Form.Item>
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  gap: 1.6rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* gap: 5.62rem; */
`;

const NameInput = styled(Input)`
  width: 12.2rem;
`;

const RelationInput = styled(Input)`
  width: 9.69rem;
`;

const ContactInput = styled(Input)`
  width: 14rem;
`;
