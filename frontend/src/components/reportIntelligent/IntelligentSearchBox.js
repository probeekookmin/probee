/*global kakao*/
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Input, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import DaumPostcode from "react-daum-postcode";
import { Circle, Map, MapMarker } from "react-kakao-maps-sdk";

// 지능형 탐색 - 도로명 주소 검색
export const IntelligentSeacrchBox = ({ title, form, name, getLocation }) => {
  const mapRef = useRef();
  const [openPostcode, setOpenPostcode] = useState(false);

  const [location, setLocation] = useState("");
  const [markerPosition, setMarkerPosition] = useState({});
  useEffect(() => {
    console.log("selectAddress", location);
    if (location) {
      handleGeocoder();
    }
  }, [location]);

  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      setLocation(data.address);
      form.setFieldsValue({ [name]: data.address }); // 주소 정보를 Form.Item에 직접 설정
      // setOpenPostcode(false);
    },

    // 선택 완료 이벤트
    clickOK: () => {
      getLocation(markerPosition);
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
          map.setCenter(new kakao.maps.LatLng(result[0].y, result[0].x));
          map.setLevel(6);
        }
      }
    };
    geocoder.addressSearch(location, callback);
  };

  return (
    <StSearchBox>
      <SearchBoxContainer onClick={handle.clickButton}>
        <SearchInput placeholder="도로명주소" variant="borderless" value={location ?? location} />
        <SearchIconWrapper>
          <SearchOutlined style={{ color: "#00000060" }} />
        </SearchIconWrapper>
      </SearchBoxContainer>
      <Modal
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
                    strokeWeight={2}
                    strokeColor={"#1890ff"}
                    strokeOpacity={0.5}
                    strokeStyle={"line"}
                    fillColor={"#CFE7FF"}
                    fillOpacity={0.6}
                  />
                  <MapMarker position={markerPosition} />
                </>
              )}
            </Map>
          </MapWrapper>
        </ModalContent>
      </Modal>
    </StSearchBox>
  );
};

const StSearchBox = styled.div``;

const SearchBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 40.5rem;
  height: 3.2rem;
  border: 0.1rem solid #d9d9d9;
  border-radius: 0.5rem;
  @media (max-width: 1440px) and (min-width: 1367px), (max-width: 1366px) and (min-width: 1281px) {
    width: 32.5rem;
  }
  @media (max-width: 1280px) and (min-width: 0px) {
    width: 32.5rem;
  }
`;

const SearchInput = styled(Input)`
  display: flex;
  width: 34rem;
  font-size: 1.6rem;
  @media (max-width: 1440px) and (min-width: 1367px), (max-width: 1366px) and (min-width: 1281px) {
    width: 30rem;
    font-size: 1.2rem;
  }
  @media (max-width: 1280px) and (min-width: 0px) {
    width: 30rem;
    font-size: 1.2rem;
  }
`;

const SearchIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.2rem;
  padding: 0.9rem;
  border-left: 0.1rem solid #d9d9d9;
`;

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
