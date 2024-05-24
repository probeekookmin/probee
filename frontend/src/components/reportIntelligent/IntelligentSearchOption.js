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
      <ContentsContainer>
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
          <ButtonWrapper className="custom-button" type="primary" htmlType="submit">
            시작하기
          </ButtonWrapper>
        </InputItem>
        {/* </InputForm> */}
      </ContentsContainer>
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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 2rem 3rem 2rem 5rem;
  border-radius: 1.5rem;
  background-color: white;
  /* background-color: #f0f3ff; */

  //box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;
`;

const ButtonWrapper = styled(Button)`
  &.custom-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 0;
    border-radius: 1rem;
    width: 12rem;
    height: 4rem;

    @media (max-width: 1900px) and (min-width: 1601px) {
      margin-top: 0rem;
      width: 10rem;
      height: 4rem;
    }

    @media (max-width: 1600px) and (min-width: 1301px) {
      /* height: 3rem; */
      margin-top: 0rem;
      width: 8.5rem;
      height: 3.5rem;
      border-radius: 0.8rem;
    }
    @media (max-width: 1300px) and (min-width: 1280px) {
      /* height: 2.8rem; */
      margin-top: 0rem;
      width: 8rem;
      height: 3rem;
    }
  }
  &.custom-button.ant-btn > span {
    font-size: 1.5rem;
    @media (max-width: 1900px) and (min-width: 1601px) {
      font-size: 1.5rem;
    }
    @media (max-width: 1600px) and (min-width: 1301px) {
      font-size: 1.4rem;
    }
    @media (max-width: 1300px) and (min-width: 1280px) {
      font-size: 1.3rem;
    }
  }
`;

const TitleContainer = styled.div`
  font-size: 2.5rem;
  font-weight: bold;

  margin-top: 1rem;
  margin-bottom: 3rem;

  @media (max-width: 1900px) and (min-width: 1601px) {
    margin: 0.8rem 0 2rem 0;
    font-size: 2.3rem;
  }
  @media (max-width: 1600px) and (min-width: 1301px) {
    margin: 0.6rem 0 1.5rem 0;
    font-size: 2.1rem;
  }
  @media (max-width: 1300px) and (min-width: 1280px) {
    margin: 0.5rem 0 1.4rem 0;
    font-size: 1.8rem;
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
  &.custom-range-picker {
    width: 42.5rem;
    height: 4.2rem;
    @media (max-width: 1900px) and (min-width: 1601px) {
      width: 36rem;
      height: 3.5rem;
    }

    @media (max-width: 1600px) and (min-width: 1301px) {
      width: 32.5rem;
      height: 3.5rem;
    }
  }
  &.ant-picker .ant-picker-input > input {
    font-size: 1.5rem;

    @media (max-width: 1900px) and (min-width: 1601px) {
      font-size: 1.5rem;
    }

    @media (max-width: 1600px) and (min-width: 1301px) {
      font-size: 1.3rem;
    }
    @media (max-width: 1300px) and (min-width: 1280px) {
      font-size: 1.3rem;
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
  bottom: 2rem;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`;

const IntelligentImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  /* right: 2rem;
  bottom: 4rem; */
  bottom: 2rem;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    animation: float 4s ease-in-out infinite;
  }
  ${floatAnimation}
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 45%;
  height: 100%;
  position: relative;
`;
