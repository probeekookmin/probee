/*global kakao*/

import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Circle, CustomOverlayMap, Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import { Button, Divider, FloatButton, List, Segmented, Switch, Tooltip } from "antd";
import Icon, { CloseOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import CenterMarker from "../../assets/icons/centerMarker.svg";
import ActivateRangeMarker from "../../assets/icons/rangeMarker_activate.svg";
import DisabledRangeMarker from "../../assets/icons/rangeMarker_disabled.svg";
import LocationMarker from "../../assets/icons/locationMarker.svg";
import CCTVMarker from "../../assets/icons/cctvMarker_y.svg";
import { getCCTVResult } from "../../core/api";
export const ReportMap = ({ start, end, searchRange, step, firstData, betweenData, secondData }) => {
  const mapRef = useRef();
  const [location, setLocation] = useState("");

  /*Overlay filter*/
  const [showStep, setShowStep] = useState("first");
  const [showRange, setShowRange] = useState(true);

  /*Marker State*/
  const [firstState, setFirstState] = useState(true);
  const [betweenState, setBetweenState] = useState(false);
  const [secondState, setSecondState] = useState(false);

  /*position */
  const [rangePosition, setRangePosition] = useState({
    lat: 37.410826,
    lng: 126.894317,
  });
  const [firstPosition, setFirstPosition] = useState([]);
  const [betweenPosition, setBetweenPosition] = useState([]);
  const [secondPosition, setSecondPosition] = useState([]);

  useEffect(() => {
    console.log("ReportMap", firstData);
    if (searchRange) {
      setRangePosition({
        lat: searchRange.latitude,
        lng: searchRange.longitude,
      });
      handleCenter();
    }
    if (firstData) {
      // const processedData = handleData(firstData);
      // console.log("processedData", processedData);
      // setFirstPosition(processedData);
      setFirstPosition(firstData);

      setFirstState(true);
    }
    if (betweenData) {
      console.log("betweenData", betweenData);
      // const data = handleData(betweenData);
      // console.log("processedData", data);
      // setBetweenPosition(data);
      setBetweenPosition(betweenData);

      setBetweenState(true);
    }
    if (secondData) {
      console.log("secondData", secondData);
      // const data = handleData(secondData);
      // console.log("processedData", data);
      // setSecondPosition(data);
      setSecondPosition(secondData);

      setSecondState(true);
    }
  }, [searchRange, firstData, betweenData, secondData]);

  useEffect(() => {
    console.log("step1Position", firstPosition);
    handleLocation();
  }, [rangePosition]);

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

  const handleLocation = () => {
    const geocoder = new kakao.maps.services.Geocoder();
    var coord = new kakao.maps.LatLng(rangePosition.lat, rangePosition.lng);

    console.log("handleLocation", rangePosition);
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
    <StReportMap>
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
                  markerStyle={CCTVMarker}
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
        <OverlayLocationWrapper
          onClick={() => {
            handleCenter();
          }}>
          <img src={LocationMarker} />
          <p>{location}</p>
        </OverlayLocationWrapper>
        <OverlaySegmented
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
          onChange={(value) => {
            setShowStep(value);
            handleCenter();
          }}
        />
      </OverlayTopContainer>
      <OverlaySideContainer>
        <OverlayTooltip placement="left" title={"탐색범위"} color="rgba(1, 1, 1, 0.6)">
          <SingleButton
            onClick={() => {
              setShowRange(!showRange);
            }}>
            {showRange ? <img src={ActivateRangeMarker} /> : <img src={DisabledRangeMarker} />}
          </SingleButton>
        </OverlayTooltip>
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
  /* max-width: 90rem; */
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

const OverlayLocationWrapper = styled.div`
  ${OverlayButtonStyle}
  flex-direction:row;
  justify-content: start;
  align-items: center;
  /* width: 25rem; */
  height: 4rem;
  padding: 0 1.2rem 0 1rem;
  margin-right: 1rem;
  opacity: 0.9;

  cursor: pointer;
  &:hover {
    color: rgba(0, 0, 0, 0.88);
    opacity: 1;
  }

  img {
    width: 2rem;
    margin-right: 0.2rem;
  }
  p {
    color: #555555;
  }
`;

const OverlaySegmented = styled(Segmented)`
  height: 4rem;
  &.ant-segmented {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4rem;
    background-color: white;
  }

  &.ant-segmented .ant-segmented-item-label {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3.4rem;
  }

  &.ant-segmented .ant-segmented-item-selected {
    background-color: #1890ff;
    color: white;
  }
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
