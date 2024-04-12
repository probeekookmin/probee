import styled from "styled-components";
import { Form, Input, Typography, Row, Col } from "antd";

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
        <Col span={7}>
          {" "}
          <Form.Item
            name={["guardian", "name"]}
            label="성명"
            rules={[
              {
                required: true,
              },
            ]}>
            <NameInput placeholder="성명입력" />
          </Form.Item>
        </Col>
        <Col span={6}>
          {" "}
          <Form.Item
            name={["guardian", "relation"]}
            label="실종자와의 관계"
            rules={[
              {
                required: true,
              },
            ]}>
            <RelationInput placeholder="예) 부, 모, 형제, 친구" />
          </Form.Item>
        </Col>
        <Col span={8}>
          {" "}
          <Form.Item
            name={["guardian", "contact"]}
            label="연락처"
            rules={[
              {
                required: true,
              },
            ]}>
            <ContactInput placeholder="- 없이 숫자만 입력" />
          </Form.Item>
        </Col>
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;

  //gap: 1.6rem;
`;

// const Row = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   /* gap: 5.62rem; */
// `;

const NameInput = styled(Input)`
  width: 19.5rem;
`;

const RelationInput = styled(Input)`
  width: 15.5rem;
`;

const ContactInput = styled(Input)`
  width: 22.4rem;
`;
