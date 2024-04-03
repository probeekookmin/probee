import styled from "styled-components";
import { Form, Typography, Select } from "antd";
//import { DownOutlined } from "@ant-design/icons";
import { bagItems, bodyItems, bottomItems, colorItems, hairItems, topItems } from "../../data/WearingItemMenu";

const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log("search:", value);
};

// Filter `option.label` match the user type `input`
const filterOption = (input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export const WearingInfo = () => {
  const SelectItem = ({ items, placeholder }) => {
    return (
      <Select
        showSearch
        placeholder={placeholder}
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        options={items}
        style={{ width: "8rem" }}
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
      <Col>
        <Row>
          <Form.Item name={["wearing", "body"]} label="체형">
            <SelectItem items={bodyItems} placeholder={"체형 선택"} />
          </Form.Item>
          <Form.Item name={["wearing", "hair"]} label="머리스타일">
            <SelectItem items={hairItems} placeholder={"머리스타일 선택"} />
          </Form.Item>
          <Form.Item name={["wearing", "bag"]} label="가방">
            <SelectItem items={bagItems} placeholder={"가방 선택"} />
          </Form.Item>
        </Row>

        <Row>
          <SetContainer>
            <Form.Item name={["wearing", "topType"]} label="상의">
              <SelectItem items={topItems} placeholder={"유형 선택"} />
            </Form.Item>
            <Form.Item name={["wearing", "topColor"]} label="  ">
              <SelectItem items={colorItems} placeholder={"색상 선택"} />
            </Form.Item>
          </SetContainer>
          <SetContainer>
            <Form.Item name={["wearing", "bottomType"]} label="하의">
              <SelectItem items={bottomItems} placeholder={"유형 선택"} />
            </Form.Item>
            <Form.Item name={["wearing", "bottomColor"]} label="  ">
              <SelectItem items={colorItems} placeholder={"색상 선택"} />
            </Form.Item>
          </SetContainer>
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

const SetContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;
