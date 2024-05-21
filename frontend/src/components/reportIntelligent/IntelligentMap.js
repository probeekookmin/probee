/*global kakao*/
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Circle, CustomOverlayMap, Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import { Button, Divider, List, Tooltip } from "antd";
import Icon, { CloseOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import CenterMarker from "../../assets/icons/centerMarker.svg";
import ActivateRangeMarker from "../../assets/icons/rangeMarker_activate.svg";
import DisabledRangeMarker from "../../assets/icons/rangeMarker_disabled.svg";
import LocationMarker from "../../assets/icons/locationMarker.svg";
import CCTVMarker from "../../assets/icons/cctvMarker_yy.svg";

export const IntelligentMap = ({ searchRange, location, cctvData }) => {
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

  const Item = ({ item }) => {
    return (
      <ItemContainer>
        <ItemImage src={item.imgUrl} alt="Image" />
      </ItemContainer>
    );
  };

  const EventMarkerContainer = ({ position, images, markerStyle }) => {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);

    return (
      <>
        <MapMarker
          position={position} // 마커를 표시할 위치
          onClick={(marker) => {
            map.panTo(marker.getPosition());
            setIsVisible(true);
          }}
          image={{
            src: markerStyle, // 마커이미지의 주소입니다
            size: {
              width: 30,
              height: 40,
            }, // 마커이미지의 크기입니다
          }}
        />
        {isVisible && (
          <CustomOverlayMap position={position}>
            <ContentsContainer>
              <TopContainer>
                <p>이미지 목록</p>
                <Button type="link" icon={<CloseOutlined />} onClick={() => setIsVisible(false)}></Button>
              </TopContainer>
              <ExplainText>탐색 결과는 최신순으로 정렬됩니다.</ExplainText>

              <ImageList
                grid={{
                  gutter: 8,
                }}
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 3,
                  size: "small",
                  position: "bottom",
                }}
                dataSource={images}
                renderItem={(item) => <Item key={item.resultId} item={item} />}
              />
            </ContentsContainer>
          </CustomOverlayMap>
        )}
      </>
    );
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
        {active &&
          cctvData &&
          cctvData.map(
            (position) => (
              console.log("position", position),
              (
                <EventMarkerContainer
                  key={`history-${position.id}`}
                  position={position.latlng}
                  images={position.images}
                  markerStyle={CCTVMarker}
                />
              )
            ),
          )}
      </Map>
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

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 37.3rem;
  height: 30rem;
  padding: 1rem;
  background-color: white;
  border-radius: 1rem;

  overflow-y: hidden;
  cursor: pointer;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  p {
    font-size: 1.5rem;
  }
`;
const ExplainText = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  font-size: 1.2rem;
  color: #8b8b8b;
`;

const ImageList = styled(List)`
  width: 100%;
  height: 100%;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.9rem;

  p {
    @media all and (max-width: 1537px) {
      font-size: 1rem;
    }
    font-size: 1.3rem;
  }
`;

const ItemImage = styled.img`
  /* width: 14.4rem;
  height: 23.8rem; */
  width: 11.52rem;
  height: 19.04rem;
  margin-right: 0.5rem;
  @media all and (max-width: 1537px) {
    width: 7.2rem;
    height: 11.9rem;
  }
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
