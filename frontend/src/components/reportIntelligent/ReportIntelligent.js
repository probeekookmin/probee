/*global kakao*/
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Col, Form, Row, message } from "antd";
import { IntelligentSearchOption } from "./IntelligentSearchOption";
import { IntelligentBasicInfo } from "./IntelligentBasicInfo";
import { IntelligentMap } from "./IntelligentMap";
import { IntelligentSearchResult } from "./IntelligentSearchResult";
import { getCCTVResult, postIntelligentSearch } from "../../core/api";
import moment from "moment";

export const ReportIntelligent = ({ data, clickData, clickId }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [latlng, setLatlng] = useState({});
  const [location, setLocation] = useState("");
  const [cctvData, setCCTVData] = useState([]);

  useEffect(() => {
    if (clickData && Object.keys(clickData).length > 0) {
      console.log("clickData", clickData);
      const start = moment(clickData.startTime, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD HH:mm");
      const end = moment(clickData.endTime, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD HH:mm");
      setLatlng({ lat: clickData.searchRange.latitude, lng: clickData.searchRange.longitude });
      fetchCCTVData();
      form.setFieldsValue({
        searchPeriod: [moment(start, "YYYY-MM-DD HH:mm"), moment(end, "YYYY-MM-DD HH:mm")],
        searchLocation: location,
      });
    }
  }, [clickData]);

  useEffect(() => {
    handleLocation();
  }, [latlng]);

  const fetchCCTVData = () => {
    getCCTVResult(data.id, "", clickId).then((res) => {
      console.log("firstCCTVData", res.data);
      setCCTVData(res.data);
    });
  };

  const getLocation = (latlng) => {
    setLatlng(latlng);
    console.log("latlng", latlng);
  };

  const handleLocation = () => {
    const geocoder = new kakao.maps.services.Geocoder();
    var coord = new kakao.maps.LatLng(latlng.lat, latlng.lng);

    var callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        console.log("handleLocation", result);
        if (result[0].road_address) {
          setLocation(result[0].road_address.address_name);
        }
        console.log("location", location);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "탐색 결과는 지능형 탐색 이력에서 확인 가능합니다.",
      duration: 10,
    });
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
    postIntelligentSearch(data.id, values).then((res) => {
      if (res.success) {
        success();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  };
  return (
    <>
      {contextHolder}
      <StReportIntelligent id="intelligent">
        <ContainerTop>
          <ContainerLeft>
            <InputForm form={form} onFinish={onFinish}>
              <IntelligentSearchOption
                form={form}
                name={data.missingPeopleName}
                getLocation={getLocation}
                location={location}
              />
            </InputForm>
          </ContainerLeft>
          <ContainerRight>
            <IntelligentBasicInfo data={data} />
          </ContainerRight>
        </ContainerTop>
        <ContainerBottom>
          <ContainerLeft>
            <IntelligentMap searchRange={latlng} location={location} cctvData={cctvData} />
          </ContainerLeft>
          <ContainerRight>
            <IntelligentSearchResult userId={data.id} resultData={clickData} resultId={clickId} />
          </ContainerRight>
        </ContainerBottom>
      </StReportIntelligent>
    </>
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
