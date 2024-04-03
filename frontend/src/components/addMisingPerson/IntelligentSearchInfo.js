import styled from "styled-components";
import { Form, DatePicker } from "antd";
import { SeacrchBox } from "../common/SearchBox";
const { RangePicker } = DatePicker;
const config = {
  rules: [
    {
      type: "object",
      message: "Please select time!",
      required: true,
    },
  ],
};
export const IntelligentSearchInfo = () => {
  return (
    <StIntelligentSearchInfo>
      <Form.Item name={["search", "searchPeriod"]} label="탐색 기간" {...config}>
        <PickerInput showTime format="YYYY-MM-DD HH:mm" />
      </Form.Item>
      <Form.Item name={["search", "searchLocation"]} label="탐색 위치" {...config}>
        <SeacrchBox />
      </Form.Item>
    </StIntelligentSearchInfo>
  );
};

const StIntelligentSearchInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const PickerInput = styled(RangePicker)`
  width: 28.9rem;
`;
