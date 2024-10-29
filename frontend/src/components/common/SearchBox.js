/*global kakao*/
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Input, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import DaumPostcode from "react-daum-postcode";
import { Circle, Map, MapMarker } from "react-kakao-maps-sdk";

//도로명 주소 검색
export const SeacrchBox = ({ title, form, name, getLocation, type }) => {
  const mapRef = useRef();
  const [openPostcode, setOpenPostcode] = useState(false);

  const [location, setLocation] = useState("");
  const [markerPosition, setMarkerPosition] = useState({});

  //시연을 위한 코드 추가
  useEffect(() => {
    if (name === "searchLocation") {
      setLocation("서울 성북구 정릉로 77");
      form.setFieldsValue({ [name]: "서울 성북구 정릉로 77" });
      setMarkerPosition({ lat: 37.610767, lng: 126.996967 });
      getLocation(markerPosition);
    }
  }, []);

  useEffect(() => {
    console.log("selectAddress", location);
    if (location) {
      handleGeocoder();
    }
  }, [location]);

  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      //시연을 위한 코드 추가 및 주석처리
      if (name === "missingLocation") {
        setOpenPostcode((current) => !current);
      }
      // setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      setLocation(data.address);
      form.setFieldsValue({ [name]: data.address }); // 주소 정보를 Form.Item에 직접 설정
      console.log("selectAddress", data.address);
    },

    // 선택 완료 이벤트
    clickOK: () => {
      if (name === "searchLocation") {
        getLocation(markerPosition);
      }

      setOpenPostcode(false);
    },
  };

  const handleGeocoder = () => {
    const geocoder = new kakao.maps.services.Geocoder();
    var callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        console.log(result);
        setMarkerPosition({
          lat: result[0].y,
          lng: result[0].x,
        });
        const map = mapRef.current;
        if (map) {
          console.log("markerPosition", markerPosition);
          map.setCenter(new kakao.maps.LatLng(result[0].y, result[0].x));
          map.setLevel(5);
        }
      }
    };
    geocoder.addressSearch(location, callback);
  };

  return (
    <StSearchBox>
      <SearchBoxContainer onClick={handle.clickButton}>
        <SearchInput placeholder="도로명주소" variant="borderless" value={location ?? location} readOnly={true} />
        <SearchIconWrapper>
          <SearchOutlined style={{ color: "#00000060" }} />
        </SearchIconWrapper>
      </SearchBoxContainer>
      <ModalWrapper
        title={title}
        centered={true}
        width={900}
        open={openPostcode}
        onOk={handle.clickOK}
        onCancel={() => setOpenPostcode(false)}>
        <ModalContent>
          <DaumPostcodeWrapper>
            <DaumPostcode
              onComplete={handle.selectAddress} // 값선택
              autoClose={false} // 값선택 시 자동 닫힘
            />
          </DaumPostcodeWrapper>

          <MapWrapper>
            <Map
              center={{ lat: 37.610767, lng: 126.996967 }}
              isPanto={true}
              style={{ width: "100%", height: "40rem" }}
              ref={mapRef}>
              {markerPosition.lat && markerPosition.lng && (
                <>
                  <Circle
                    center={markerPosition}
                    radius={500}
                    strokeWeight={2} // 선의 두께입니다
                    strokeColor={"#1890ff"} // 선의 색깔입니다
                    strokeOpacity={0.5} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle={"line"} // 선의 스타일 입니다
                    fillColor={"#CFE7FF"} // 채우기 색깔입니다
                    fillOpacity={0.6} // 채우기 불투명도 입니다
                  />
                  <MapMarker position={markerPosition} />
                </>
              )}
            </Map>
          </MapWrapper>
        </ModalContent>
      </ModalWrapper>
    </StSearchBox>
  );
};

const StSearchBox = styled.div``;

const SearchBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 40rem;
  height: 3.2rem;
  border: 0.1rem solid #d9d9d9;
  border-radius: 0.5rem;
`;

const SearchInput = styled(Input)`
  display: flex;
  width: 34.6rem;
`;

const SearchIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.2rem;
  padding: 0.9rem;
  border-left: 0.1rem solid #d9d9d9;
`;

const ModalWrapper = styled(Modal)``;
const ModalContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const DaumPostcodeWrapper = styled.div`
  width: 50%;
  height: 100%;
`;

const MapWrapper = styled.div`
  width: 50%;
  height: 100%;
`;
