import styled from "styled-components";
import { Row, Col, Typography, Form, Button, DatePicker, TimePicker } from "antd";
import moment from "moment";
import { SeacrchBox } from "../common/SearchBox";
import { IntelligentSeacrchBox } from "./IntelligentSearchBox";
import { useEffect, useState } from "react";
import IntelligentImg from "../../assets/images/intelligentImg.svg";
import IntelligentFrameImg from "../../assets/images/intelligentFrameImg.svg";
import IntelligentFloatImg from "../../assets/images/intelligentFloatImg.svg";
const { RangePicker } = DatePicker;

const config = {
  rules: [
    {
      //   type: "object",
      message: "Please select time!",
      required: true,
    },
  ],
};
const rangeConfig = {
  rules: [
    {
      type: "array",
      required: true,
      message: "Please select time!",
    },
  ],
};

export const IntelligentSearchOption = ({ form, name, getLocation, location }) => {
  // const [form] = Form.useForm();
  // const [inputLocation, setInputLocation] = useState(location ?? "");
  console.log("IntelligentSearchOption", location);
  // useEffect(() => {
  //   if (location) {
  //     console.log("IntelligentSearchOption", location);
  //     setInputLocation(location);
  //   }
  // }, [location]);

  return (
    <StIntelligentSearchOption>
      <>
        {" "}
        <TitleContainer>{name}님의 지능형 탐색</TitleContainer>
        {/* <InputForm form={form}> */}
        <InputItem name="searchPeriod" label="기간" {...rangeConfig} colon={false} className="form-custom">
          <RangePickerWrapper
            className="custom-range-picker"
            showTime
            format="YYYY-MM-DD HH:mm"
            placeholder={["시작일시", "종료일시"]}
            disabledDate={(d) => !d || d.isAfter(moment())}
            disabledTime={(d) => !d || d.isAfter(moment())}
          />
        </InputItem>
        <InputItem name="searchLocation" label="위치" {...config} colon={false} className="form-custom">
          <IntelligentSeacrchBox
            title={"탐색 위치"}
            form={form}
            name="searchLocation"
            getLocation={getLocation}
            location={location}
          />
        </InputItem>
        <InputItem>
          <ButtonWrapper type="primary" htmlType="submit">
            시작하기
          </ButtonWrapper>
        </InputItem>
        {/* </InputForm> */}
      </>
      <ImageContainer>
        <IntelligentImageContainer>
          <img src={IntelligentFloatImg} />
        </IntelligentImageContainer>
        <IntelligentImageFrameContainer>
          <img src={IntelligentFrameImg} />
        </IntelligentImageFrameContainer>
      </ImageContainer>
    </StIntelligentSearchOption>
  );
};

const StIntelligentSearchOption = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 2rem 3rem 2rem 5rem;
  border-radius: 1.5rem;
  background-color: white;
  /* background-color: #f0f3ff; */

  //box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`;

const ButtonWrapper = styled(Button)`
  margin-top: 2rem;
  margin-bottom: 0;
  border-radius: 1rem;
  width: 12rem;
  height: 4rem;
  &.ant-btn > span {
    font-size: 1.5rem;
  }
  @media (max-width: 1440px) and (min-width: 1367px), (max-width: 1366px) and (min-width: 1281px) {
    margin-top: 1rem;
  }
  @media (max-width: 1280px) and (min-width: 0px) {
    margin-top: 1rem;
  }
`;

const TitleContainer = styled.div`
  font-size: 2.5rem;
  font-weight: bold;

  margin-top: 1rem;
  margin-bottom: 3rem;
  @media (max-width: 1440px) and (min-width: 1367px), (max-width: 1366px) and (min-width: 1281px) {
    margin-top: 0.8rem;
    margin-bottom: 0.8rem;
    font-size: 1.8rem;
  }
  @media (max-width: 1280px) and (min-width: 0px) {
    margin: 0.6rem 0;
    font-size: 1.6rem;
  }
`;

const InputForm = styled(Form)`
  &.ant-form-vertical .ant-form-item-label {
    padding: 0;
  }
`;

const InputItem = styled(Form.Item)`
  margin-bottom: 2rem;
  padding: 0;

  &.form-custom .ant-form-item-label > label {
    margin: 0;
    padding: 0;
    color: #8b8b8b;
    font-size: 1.1rem;
  }
  &.form-custom .ant-form-item-label > label::after {
    margin: 0;
    padding: 0;
  }
  @media (max-width: 1440px) and (min-width: 1367px), (max-width: 1366px) and (min-width: 1281px) {
    margin-bottom: 0.4rem;
  }
  @media (max-width: 1280px) and (min-width: 0px) {
    margin-bottom: 0.4rem;
  }
`;

const RangePickerWrapper = styled(RangePicker)`
  &.ant-picker .ant-picker-input > input {
    font-size: 1.4rem;
    @media (max-width: 1440px) and (min-width: 1367px), (max-width: 1366px) and (min-width: 1281px) {
      font-size: 1.2rem;
    }
    @media (max-width: 1280px) and (min-width: 0px) {
      font-size: 1.2rem;
    }
  }
`;

const floatAnimation = `
  @keyframes float {
    0% {
      transform: translatey(0px);
    }
    50% {
      transform: translatey(-10px);
    }
    100% {
      transform: translatey(0px);
    }
  }
`;

const IntelligentImageFrameContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 2rem;
  bottom: 4rem;

  img {
    width: 51.75rem;
    height: 29.1rem;
    /* width: 62.1rem;
    height: 34.8rem; */
    @media (max-width: 1900px) and (min-width: 1601px) {
      bottom: 0;
      width: 44.85rem;
      height: 25.2rem;
    }
    @media (max-width: 1600px) and (min-width: 1421px) {
      bottom: 0rem;
      width: 33.6rem;
      height: 18.9rem;
    }
    @media (max-width: 1420px) {
      bottom: -1rem;
      width: 20rem;
      height: 12.6rem;
    }
  }
`;

const IntelligentImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 2rem;
  bottom: 4rem;

  img {
    /* width: 34.5rem;
    height: 19.4rem; */
    /* width: 44.85rem;
    height: 25.2rem; */
    width: 51.75rem;
    height: 29.1rem;
    animation: float 4s ease-in-out infinite;
    @media (max-width: 1900px) and (min-width: 1601px) {
      bottom: 0;
      width: 44.85rem;
      height: 25.2rem;
    }
    @media (max-width: 1600px) and (min-width: 1421px) {
      bottom: 0rem;
      width: 33.6rem;
      height: 18.9rem;
    }
    @media (max-width: 1420px) {
      bottom: -1rem;
      width: 22.4rem;
      height: 12.6rem;
    }
  }
  ${floatAnimation}
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 1;
  height: 100%;
  margin: 0;
`;
