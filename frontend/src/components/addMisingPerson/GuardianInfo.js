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
        보호자
      </Typography.Title>
      <Row>
        <Col span={9}>
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
        <Col span={7}>
          <Form.Item
            name={["guardian", "relation"]}
            label="실종자와의 관계"
            rules={[
              {
                required: true,
              },
            ]}>
            <RelationInput placeholder="ex) 부, 모, 형제, 친구" />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            name={["guardian", "contact"]}
            label="연락처"
            rules={[
              {
                required: true,
                pattern: new RegExp(/^[0-9]{3}-[0-9]{4}-[0-9]{4}$/),
                message: "'-'를 포함하여 입력해주세요.\nex) '010-1234-5678'",
              },
            ]}
            style={{ whiteSpace: "pre-wrap" }}>
            <ContactInput placeholder="ex) 010-1234-5678" />
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
