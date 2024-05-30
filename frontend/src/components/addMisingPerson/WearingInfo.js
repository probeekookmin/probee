import styled from "styled-components";
import { Form, Typography, Select, Row, Col } from "antd";
import { bagItems, bottomItems, colorItems, hairItems, topItems } from "../../data/WearingItemMenu";

/*실종정보 등록 - 착장 정보 */
export const WearingInfo = ({ form }) => {
  const onChange = (value, name) => {
    form.setFieldsValue({
      [name]: value,
    });
  };
  const SelectItem = ({ items, placeholder, name }) => {
    return (
      <Select
        showSearch
        allowClear={true}
        placeholder={placeholder}
        optionFilterProp="children"
        onChange={(value) => onChange(value, name)}
        options={items}
        value={form.getFieldValue(name)}
        style={{ width: "14rem" }}
      />
    );
  };

  return (
    <Wrapper>
      <Typography.Title
        level={5}
        style={{
          margin: 0,
        }}>
        실종자 착장 정보
      </Typography.Title>

      <Row gutter={[12, 1]}>
        <Col span={9}>
          <Form.Item
            name="hair"
            label="머리스타일"
            rules={[
              {
                required: true,
              },
            ]}>
            <SelectItem items={hairItems} placeholder={"머리스타일 선택"} name="hair" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <SetContainer>
            <Form.Item
              name="topType"
              label="상의"
              rules={[
                {
                  required: true,
                },
              ]}>
              <SelectItem items={topItems} placeholder={"유형 선택"} name="topType" />
            </Form.Item>
            <Form.Item name="topColor" label="  ">
              <SelectItem items={colorItems} placeholder={"색상 선택"} name="topColor" />
            </Form.Item>
          </SetContainer>
        </Col>{" "}
        <Col span={9}>
          <Form.Item name="bag" label="가방">
            <SelectItem items={bagItems} placeholder={"가방 선택"} name="bag" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <SetContainer>
            <Form.Item
              name="bottomType"
              label="하의"
              rules={[
                {
                  required: true,
                },
              ]}>
              <SelectItem items={bottomItems} placeholder={"유형 선택"} name="bottomType" />
            </Form.Item>
            <Form.Item name="bottomColor" label="  ">
              <SelectItem items={colorItems} placeholder={"색상 선택"} name="bottomColor" />
            </Form.Item>
          </SetContainer>
        </Col>
      </Row>
    </Wrapper>
  );
};

// 각 정보 입력 영역
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  gap: 1.6rem;
`;
// const Col = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0rem;
// `;
// const Row = styled.div`
//   display: flex;
//   flex-direction: row;
//   //justify-content: space-between;
//   gap: 5.62rem;
// `;

const SetContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;
