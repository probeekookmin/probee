import styled from "styled-components";
import { Form, Typography, Select, Row, Col } from "antd";
//import { DownOutlined } from "@ant-design/icons";
import { bagItems, bodyItems, bottomItems, colorItems, hairItems, topItems } from "../../data/WearingItemMenu";
const { Option } = Select;
// const onChange = (value) => {
//   console.log(`selected ${value}`);
// };
const onSearch = (value) => {
  console.log("search:", value);
};

// Filter `option.label` match the user type `input`
const filterOption = (input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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
        placeholder={placeholder}
        optionFilterProp="children"
        onChange={(value) => onChange(value, name)}
        onSearch={onSearch}
        filterOption={filterOption}
        options={items}
        style={{ width: "14rem" }}
      />
      // <Select style={{ width: "14rem" }} name={name}>
      //   {items.map((item) => (
      //     <Option key={item.key} value={item.value}>
      //       {item.label}
      //     </Option>
      //   ))}
      // </Select>
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
          <Form.Item name="hair" label="머리스타일">
            <SelectItem items={hairItems} placeholder={"머리스타일 선택"} name="hair" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <SetContainer>
            <Form.Item name="topType" label="상의">
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
            <Form.Item name="bottomType" label="하의">
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
