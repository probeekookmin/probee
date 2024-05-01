import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
export const IntelligentMap = () => {
  return (
    <StIntelligentMap>
      <Map center={{ lat: 37.610826, lng: 126.994317 }} style={{ width: "100%", height: "100%" }}></Map>
    </StIntelligentMap>
  );
};

const StIntelligentMap = styled.div`
  width: 100%;
  height: 100%;
`;
