import styled from "styled-components";
import { Form, DatePicker } from "antd";
import { SeacrchBox } from "../common/SearchBox";
const { RangePicker } = DatePicker;
const config = {
  rules: [
    {
      //   type: "object",
      message: "탐색 위치를 입력해주세요!",
      // required: true,
    },
  ],
};
const rangeConfig = {
  rules: [
    {
      type: "array",
      required: true,
      message: "탐색 기간을 입력해주세요!",
    },
  ],
};
export const IntelligentSearchInfo = () => {
  return (
    <StIntelligentSearchInfo>
      <Form.Item name="searchPeriod" label="탐색 기간" {...rangeConfig}>
        <RangePicker showTime format="YYYY-MM-DD HH:mm" placeholder={["시작일시", "종료일시"]} />
      </Form.Item>
      <Form.Item name={["search", "searchLocation"]} label="탐색 위치" {...config}>
        <SeacrchBox title={"탐색 위치"} />
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
