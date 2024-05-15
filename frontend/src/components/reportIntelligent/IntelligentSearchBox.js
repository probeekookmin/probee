import styled from "styled-components";
import { Input, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import DaumPostcode from "react-daum-postcode";
import { useState } from "react";

//도로명 주소 검색
export const IntelligentSeacrchBox = ({ title, form, name }) => {
  const [openPostcode, setOpenPostcode] = useState(false);

  const [location, setLocation] = useState("");
  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      setLocation(data.address);
      form.setFieldsValue({ [name]: data.address }); // 주소 정보를 Form.Item에 직접 설정
      setOpenPostcode(false);
    },
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
        style={{
          top: 20,
        }}
        open={openPostcode}
        onOk={() => setOpenPostcode(false)}
        onCancel={() => setOpenPostcode(false)}>
        <DaumPostcode
          onComplete={handle.selectAddress} // 값선택
          autoClose={false} // 값선택 시 자동 닫힘
        />
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