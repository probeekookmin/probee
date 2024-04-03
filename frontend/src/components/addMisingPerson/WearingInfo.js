import styled from "styled-components";
import { Form, Typography, Select } from "antd";
//import { DownOutlined } from "@ant-design/icons";
import { bodyItems, bottomItems, colorItems, hairItems, topItems } from "../../data/WearingItemMenu";

const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log("search:", value);
};

// Filter `option.label` match the user type `input`
const filterOption = (input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export const WearingInfo = () => {
  const SelectItem = ({ items }) => {
    return (
      <Select
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        options={items}
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
        착장 정보
      </Typography.Title>
      <Col>
        <Row>
          <Form.Item name={["wearing", "body"]} label="체형">
            <SelectItem items={bodyItems} />
          </Form.Item>
          <Form.Item name={["wearing", "topType"]} label="상의 유형">
            <SelectItem items={topItems} />
          </Form.Item>
          <Form.Item name={["wearing", "topColor"]} label="상의 색상">
            <SelectItem items={colorItems} />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item name={["wearing", "hair"]} label="머리스타일">
            <SelectItem items={hairItems} />
          </Form.Item>
          <Form.Item name={["wearing", "bottomType"]} label="하의 유형">
            <SelectItem items={bottomItems} />
          </Form.Item>
          <Form.Item name={["wearing", "bottomColor"]} label="하의 색상">
            <SelectItem items={colorItems} />
          </Form.Item>
        </Row>
      </Col>
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
const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0rem;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  //justify-content: space-between;
  gap: 5.62rem;
`;
