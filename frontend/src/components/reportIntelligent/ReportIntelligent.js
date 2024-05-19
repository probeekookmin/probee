import styled from "styled-components";
import { useState } from "react";
import { Col, Form, Row } from "antd";
import { IntelligentSearchOption } from "./IntelligentSearchOption";
import { IntelligentBasicInfo } from "./IntelligentBasicInfo";
import { IntelligentMap } from "./IntelligentMap";
import { IntelligentSearchResult } from "./IntelligentSearchResult";
import { postIntelligentSearch } from "../../core/api";

export const ReportIntelligent = ({ data }) => {
  const [form] = Form.useForm();
  const [latlng, setLatlng] = useState({});

  const getLocation = (latlng) => {
    setLatlng(latlng);
    console.log("latlng", latlng);
  };

  const onFinish = (fieldsValue) => {
    const values = {
      startTime:
        fieldsValue["searchPeriod"][0].format("YYYY-MM-DD") + "T" + fieldsValue["searchPeriod"][0].format("HH:mm"),
      endTime:
        fieldsValue["searchPeriod"][1].format("YYYY-MM-DD") + "T" + fieldsValue["searchPeriod"][1].format("HH:mm"),
      latitude: latlng["lat"],
      longitude: latlng["lng"],
      locationAddress: fieldsValue["searchLocation"],
    };
    console.log("Received values of form: ", values);
    // postIntelligentSearch(data.id, values);
  };
  return (
    <StReportIntelligent id="intelligent">
      <ContainerTop>
        <ContainerLeft>
          <InputForm form={form} onFinish={onFinish}>
            <IntelligentSearchOption form={form} name={data.missingPeopleName} getLocation={getLocation} />
          </InputForm>
        </ContainerLeft>
        <ContainerRight>
          <IntelligentBasicInfo data={data} />
        </ContainerRight>
      </ContainerTop>
      <ContainerBottom>
        <ContainerLeft>
          <IntelligentMap />
        </ContainerLeft>
        <ContainerRight>
          <IntelligentSearchResult />
        </ContainerRight>
      </ContainerBottom>
    </StReportIntelligent>
  );
};

const StReportIntelligent = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  padding: 3rem 0 3rem 0;
  overflow: hidden;
  @media (max-width: 1440px) and (min-width: 1367px), (max-width: 1366px) and (min-width: 1281px) {
    padding: 2rem 0 1rem 0;
  }
  @media (max-width: 1280px) and (min-width: 0px) {
    padding: 1.5rem 0 0rem 0;
  }
`;

const ContainerTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 30%;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const ContainerBottom = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 70%;
`;

const ContainerLeft = styled.div`
  display: flex;

  width: 60%;
  height: 100%;

  margin-right: 2rem;
`;
const ContainerRight = styled.div`
  display: flex;

  width: 40%;
  height: 100%;
`;

const InputForm = styled(Form)`
  width: 100%;
  &.ant-form-vertical .ant-form-item-label {
    padding: 0;
  }
`;
