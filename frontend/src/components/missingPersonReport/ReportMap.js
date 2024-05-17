/*global kakao*/

import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Circle, CustomOverlayMap, Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import { Button, FloatButton, Segmented, Switch, Tooltip } from "antd";
import Icon, { CloseOutlined } from "@ant-design/icons";
import CenterMarker from "../../assets/icons/centerMarker.svg";
import ActivateRangeMarker from "../../assets/icons/rangeMarker_activate.svg";
import DisabledRangeMarker from "../../assets/icons/rangeMarker_disabled.svg";
export const ReportMap = ({ start, end, searchRange, firstData, betweenData, secondData }) => {
  const mapRef = useRef();

  /*Overlay filter*/
  const [showStep, setShowStep] = useState("first");
  const [showRange, setShowRange] = useState(true);

  /*Marker State*/
  const [cctvState, setCctvState] = useState({});
  const [firstState, setFirstState] = useState(true);
  const [betweenState, setBetweenState] = useState(false);
  const [secondState, setSecondState] = useState(false);

  /*position */
  const [rangePosition, setRangePosition] = useState({
    lat: 37.610826,
    lng: 126.994317,
  });
  const [firstPosition, setFirstPosition] = useState([]);
  const [betweenPosition, setBetweenPosition] = useState([]);
  const [secondPosition, setSecondPosition] = useState([]);

  useEffect(() => {
    console.log("ReportMap", firstData);
    if (searchRange) {
      handleCenter();
    }
    if (firstData) {
      const processedData = handleData(firstData);
      console.log("processedData", processedData);
      setFirstPosition(processedData);
      setFirstState(true);
    }
    if (betweenData) {
      console.log("betweenData", betweenData);
      const data = handleData(betweenData);
      console.log("processedData", data);
      setBetweenPosition(data);
      setBetweenState(true);
    }
    if (secondData) {
      console.log("secondData", secondData);
      const data = handleData(secondData);
      console.log("processedData", data);
      setSecondPosition(data);
      setSecondState(true);
    }
  }, [searchRange, firstData, betweenData, secondData]);

  useEffect(() => {
    console.log("step1Position", firstPosition);
  }, [firstPosition]);

  const handleData = (data) => {
    console.log("handleData", data);
    const processedData = data.reduce((acc, curr) => {
      const existingCctvIndex = acc.findIndex((item) => item.id === curr.cctv.id);
      if (existingCctvIndex !== -1) {
        acc[existingCctvIndex].images.push({ resultId: curr.resultId, imgUrl: curr.imgUrl });
      } else {
        acc.push({
          id: curr.cctv.id,
          images: [{ resultId: curr.resultId, imgUrl: curr.imgUrl }],
          latlng: { lat: curr.cctv.latitude, lng: curr.cctv.longitude },
        });
      }
      return acc;
    }, []);
    return processedData;
  };

  const handleCenter = () => {
    setRangePosition({
      lat: searchRange.latitude,
      lng: searchRange.longitude,
    });

    const map = mapRef.current;
    if (map) {
      console.log("markerPosition", rangePosition);
      map.setCenter(new kakao.maps.LatLng(rangePosition.lat, rangePosition.lng));
      map.setLevel(5);
    }
  };

  const handleDataFilter = () => {};

  const Item = ({ item }) => {
    return (
      <ItemContainer>
        <ItemImage src={item.imgUrl} alt="Image" />
        {/* <p>{item.date}</p>
        <p>{item.time}</p>
        <p>정확도:{item.similarity}</p> */}
      </ItemContainer>
    );
  };

  const EventMarkerContainer = ({ position, images, markerStyle }) => {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);
    const mapR = mapRef.current;
    if (mapR) {
      console.log("markerPosition", rangePosition);
      map.setCenter(new kakao.maps.LatLng(rangePosition.lat, rangePosition.lng));
      map.setLevel(5);
    }

    return (
      <>
        <MapMarker
          position={position} // 마커를 표시할 위치
          // @ts-ignore
          onClick={(marker) => {
            map.panTo(marker.getPosition());
            setIsVisible(true);
          }}
          image={{
            src: markerStyle, // 마커이미지의 주소입니다
            size: {
              width: 24,
              height: 35,
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

              <ImageContainer>
                {images && images.map((item) => <Item key={item.resultId} item={item} />)}
              </ImageContainer>
            </ContentsContainer>
          </CustomOverlayMap>
        )}
      </>
    );
  };

  return (
    <StReportMap>
      <Map
        ref={mapRef}
        center={rangePosition} //{ lat: 37.610826, lng: 126.994317 }
        level={5}
        style={{ width: "100%", height: "100%" }}
        isPanto={true}>
        {showRange && rangePosition.lat && rangePosition.lng && (
          <>
            <Circle
              center={rangePosition}
              radius={500}
              strokeWeight={2} // 선의 두께입니다
              strokeColor={"#1890ff"} // 선의 색깔입니다
              strokeOpacity={0.5} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
              strokeStyle={"line"} // 선의 스타일 입니다
              fillColor={"#CFE7FF"} // 채우기 색깔입니다
              fillOpacity={0.6} // 채우기 불투명도 입니다
            />
            <MapMarker
              position={rangePosition}
              image={{
                src: CenterMarker, // 마커이미지의 주소입니다
                size: {
                  width: 20,
                  height: 20,
                }, // 마커이미지의 크기입니다
              }}
            />
          </>
        )}
        {showStep == "first" &&
          firstState &&
          firstPosition &&
          firstPosition.map(
            (position) => (
              console.log("position", position),
              (
                <EventMarkerContainer
                  key={`step1-${position.id}`}
                  position={position.latlng}
                  images={position.images}
                  markerStyle={"https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"}
                />
              )
            ),
          )}
        {showStep == "between" &&
          betweenState &&
          betweenPosition &&
          betweenPosition.map(
            (position) => (
              console.log("position", position),
              (
                <EventMarkerContainer
                  key={`between-${position.id}`}
                  position={position.latlng}
                  images={position.images}
                  markerStyle={"https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"}
                />
              )
            ),
          )}
        {showStep == "second" &&
          secondState &&
          secondPosition &&
          secondPosition.map(
            (position) => (
              console.log("position", position),
              (
                <EventMarkerContainer
                  key={`second-${position.id}`}
                  position={position.latlng}
                  images={position.images}
                  markerStyle={"https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"}
                />
              )
            ),
          )}
      </Map>
      <OverlayTopContainer>
        <Segmented
          options={[
            {
              label: "1차 탐색",
              value: "first",
              disabled: firstState ? false : true,
            },
            {
              label: "이미지 선별",
              value: "between",
              disabled: betweenState ? false : true,
            },
            {
              label: "2차 탐색",
              value: "second",
              disabled: false,
            },
          ]}
          value={showStep}
          onChange={setShowStep}
        />
      </OverlayTopContainer>
      <OverlaySideContainer>
        <OverlayTooltip placement="left" title={"탐색범위"} arrow={true}>
          <SingleButton
            onClick={() => {
              setShowRange(!showRange);
            }}>
            {showRange ? <img src={ActivateRangeMarker} /> : <img src={DisabledRangeMarker} />}
          </SingleButton>
        </OverlayTooltip>
      </OverlaySideContainer>
    </StReportMap>
  );
};

const StReportMap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-grow: 1;
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 90rem;
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30rem;
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
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.4rem;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10rem;
    background: #8b8b8b;
  }
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
  width: 14.4rem;
  height: 23.8rem;
  margin-right: 0.9rem;
  @media all and (max-width: 1537px) {
    width: 7.2rem;
    height: 11.9rem;
  }
`;

const OverlayTopContainer = styled.div`
  display: flex;
  flex-direction: row;

  position: absolute;
  z-index: 1;
  top: 1rem;
  left: 1rem;
`;

const OverlaySideContainer = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;
  z-index: 1;
  top: 1rem;
  right: 1rem;
`;

const OverlayTooltip = styled(Tooltip)``;

const OverlayButtonStyle = `
  display: flex;
  border-radius: 0.5rem;
background-color: white;`;

const SingleButton = styled.div`
  ${OverlayButtonStyle}

  width: 3rem;
  height: 3rem;
  justify-content: center;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;
  z-index: 1;
  float: right;
  top: 1rem;
  right: 1rem;
  width: 7rem;
  height: 10rem;

  background-color: white;
  border-radius: 1rem;
`;

const SwitchButton = styled(Switch)`
  width: 3rem;
`;
