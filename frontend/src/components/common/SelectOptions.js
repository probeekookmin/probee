import { Select } from "antd";
import styled from "styled-components";

export const SelectOptions = () => {
  return (
    <StSelectOptions>
      <Options
        className="custom-select"
        defaultValue="정확도순"
        // size="small"
        style={{
          width: 120,
        }}
        options={[
          {
            value: "정확도순",
            label: "정확도순",
          },
          {
            value: "최근순",
            label: "최근순",
          },
          {
            value: "오래된순",
            label: "오래된순",
          },
        ]}
      />
    </StSelectOptions>
  );
};

const StSelectOptions = styled.div``;
const Options = styled(Select)`
  &.ant-select .ant-select-selection-item {
    font-size: 1.3rem;
  }
  &.ant-select-single.ant-select .ant-select-selector {
    padding: 1rem;
  }
`;
