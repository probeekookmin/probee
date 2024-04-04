import styled from "styled-components";
import { Input, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import DaumPostcode from "react-daum-postcode";
import { useState } from "react";

const { Search } = Input;

export const SeacrchBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleModal = () => {
    setIsOpen((prev) => !prev);
  };
  const handleComplete = (data) => {
    console.log(data);
    onToggleModal(); // 주소창은 자동으로 사라지므로 모달만 꺼주면 된다.
  };
  const [openPostcode, setOpenPostcode] = useState(false);

  const [calendarlocation, setCalendarLocation] = useState("");
  const locations = { calendarLocation: calendarlocation };
  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      setCalendarLocation(data.address);
      setOpenPostcode(false);
    },
  };

  return (
    <StSeacrchBox>
      <SearchBoxContainer onClick={handle.clickButton}>
        <SearchInput placeholder="도로명주소" variant="borderless" />
        <SearchIconWrapper>
          <SearchOutlined style={{ color: "#00000060" }} />
        </SearchIconWrapper>
      </SearchBoxContainer>
      <div>
        {openPostcode && (
          <DaumPostcode
            onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
          />
        )}
      </div>
    </StSeacrchBox>
    // <>
    //   <div name="calendarlocation" value={calendarlocation} onClick={handle.clickButton} style={{}}>
    //     {calendarlocation ? calendarlocation : "장소를 검색해주세요"}
    //   </div>

    //   <div>
    //     {openPostcode && (
    //       <DaumPostcode
    //         onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
    //         autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
    //       />
    //     )}
    //   </div>
    // </>
  );
};

const StSeacrchBox = styled.div``;
// const SearchBox = styled(Search)`
//   width: 25.1rem;
// `;
const SearchBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 23.1rem;
  height: 2rem;
  border: 1px solid #d9d9d9;
  border-radius: 0.5rem;
`;

const SearchInput = styled(Input)`
  display: flex;
  width: 20rem;
`;

const SearchIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  padding: 0.5rem;
  border-left: 1px solid #d9d9d9;
`;
