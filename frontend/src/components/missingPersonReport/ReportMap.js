import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
export const ReportMap = () => {
  return (
    <StReportMap>
      <Map center={{ lat: 37.610826, lng: 126.994317 }} style={{ width: "100%", height: "100%" }}></Map>
    </StReportMap>
  );
};

const StReportMap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  max-width: 90rem;
`;
