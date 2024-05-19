/*global kakao*/
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Circle, CustomOverlayMap, Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import { Divider, Tooltip } from "antd";
import Icon, { CloseOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import CenterMarker from "../../assets/icons/centerMarker.svg";
import ActivateRangeMarker from "../../assets/icons/rangeMarker_activate.svg";
import DisabledRangeMarker from "../../assets/icons/rangeMarker_disabled.svg";
import LocationMarker from "../../assets/icons/locationMarker.svg";
import CCTVMarker from "../../assets/icons/cctvMarker_yy.svg";

export const IntelligentMap = ({ searchRange, location }) => {
  const mapRef = useRef();
  const [showRange, setShowRange] = useState(false);
  const [active, setActive] = useState(false);
  /*position */
  const [rangePosition, setRangePosition] = useState({
    lat: 37.410826,
    lng: 126.894317,
  });

  useEffect(() => {
    if (searchRange && searchRange.lat && searchRange.lng) {
      setRangePosition(searchRange);
      setShowRange(true);
      setActive(true);
      handleCenter();
    }
  }, [searchRange]);

  const handleCenter = () => {
    const map = mapRef.current;
    if (map) {
      console.log("markerPosition", rangePosition);
      map.setCenter(new kakao.maps.LatLng(rangePosition.lat, rangePosition.lng));
      map.setLevel(4);
    }
    console.log("handleCenter", rangePosition);
  };

  const handleLevel = (type) => {
    const map = mapRef.current;
    if (!map) return;

    if (type === "increase") {
      map.setLevel(map.getLevel() + 1);
    } else {
      type === "decrease";
      map.setLevel(map.getLevel() - 1);
    }
  };
  return (
    <StIntelligentMap>
      <Map
        ref={mapRef}
        center={rangePosition} //{ lat: 37.610826, lng: 126.994317 }
        level={4}
        style={{ width: "100%", height: "100%" }}
        zoomable={true}
        isPanto={true}>
        {showRange && rangePosition.lat && rangePosition.lng && (
          <>
            <Circle
              center={rangePosition}
              radius={500}
              strokeWeight={2} // 선의 두께
              strokeColor={"#1890ff"} // 선의 색상
              strokeOpacity={0.5} // 선의 불투명도, 1~0, 0에 가까울수록 투명
              strokeStyle={"line"} // 선의 스타일
              fillColor={"#CFE7FF"} // 채우기 색상
              fillOpacity={0.6} // 채우기 불투명도
            />
            <MapMarker
              position={rangePosition}
              image={{
                src: CenterMarker, // 마커이미지의 주소
                size: {
                  width: 20,
                  height: 20,
                }, // 마커이미지의 크기
              }}
            />
          </>
        )}
      </Map>{" "}
      <OverlaySideContainer>
        {active ? (
          <OverlayTooltip placement="left" title={"탐색범위"} color="rgba(1, 1, 1, 0.6)">
            <SingleButton
              onClick={() => {
                setShowRange(!showRange);
              }}>
              {showRange ? <img src={ActivateRangeMarker} /> : <img src={DisabledRangeMarker} />}
            </SingleButton>
          </OverlayTooltip>
        ) : (
          <SingleButton>
            {showRange ? <img src={ActivateRangeMarker} /> : <img src={DisabledRangeMarker} />}
          </SingleButton>
        )}
        <GroupButton>
          <ButtonWrapper onClick={() => handleLevel("decrease")}>
            <IconWrapper component={PlusOutlined} />
            {/* <PlusOutlined /> */}
          </ButtonWrapper>
          <Divider style={{ margin: 0 }} />
          <ButtonWrapper onClick={() => handleLevel("increase")}>
            {/* <MinusOutlined /> */}
            <IconWrapper component={MinusOutlined} />
          </ButtonWrapper>
        </GroupButton>
      </OverlaySideContainer>
    </StIntelligentMap>
  );
};

const StIntelligentMap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-grow: 1;
  position: relative;
  width: 100%;
  height: 100%;
`;
const OverlaySideContainer = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;
  z-index: 1;
  top: 10rem;
  right: 1rem;
`;

const OverlayTooltip = styled(Tooltip)``;

const OverlayButtonStyle = `
  display: flex;
  margin-bottom: 1rem;
  border-radius: 0.4rem;
  background-color: white;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);`;

const SingleButton = styled.div`
  ${OverlayButtonStyle}

  width: 3.5rem;
  height: 3.5rem;
  justify-content: center;
`;

const GroupButton = styled.div`
  ${OverlayButtonStyle}

  width: 3.5rem;
  height: 7rem;
  flex-direction: column;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 3.5rem;
`;

const IconWrapper = styled(Icon)`
  color: #555555;
  &:focus {
    color: rgba(0, 0, 0, 0.5);
  }
  &:active {
    color: rgba(0, 0, 0, 0.5);
  }
`;
