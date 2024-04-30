import styled from "styled-components";
import { SelectImgList } from "../components/guardianSelect/SelectImgList";
import { useState } from "react";
import { AllResultList } from "../components/guardianSelect/AllResultList";
import { Button } from "antd";

// 더미 데이터
const dummyData = [
  {
    path: "missingPeopleId=1/searchHistoryId=1/step=FIRST/001-channels4_profile.jpg",
    url: "https://picsum.photos/200/300?random=1",
    size: 185327,
  },
  {
    path: "missingPeopleId=1/searchHistoryId=1/step=FIRST/001-channels4_profile.jpg",
    url: "https://picsum.photos/200/300?random=2",
    size: 185327,
  },
  {
    path: "missingPeopleId=1/searchHistoryId=1/step=FIRST/001-channels4_profile.jpg",
    url: "https://picsum.photos/200/300?random=3",
    size: 185327,
  },
  {
    path: "missingPeopleId=1/searchHistoryId=1/step=FIRST/001-channels4_profile.jpg",
    url: "https://picsum.photos/200/300?random=4",
    size: 185327,
  },
  {
    path: "missingPeopleId=1/searchHistoryId=1/step=FIRST/001-channels4_profile.jpg",
    url: "https://picsum.photos/200/300?random=5",
    size: 185327,
  },
  {
    path: "missingPeopleId=1/searchHistoryId=1/step=FIRST/001-channels4_profile.jpg",
    url: "https://picsum.photos/200/300",
    size: 185327,
  },
  {
    path: "missingPeopleId=1/searchHistoryId=1/step=FIRST/001-channels4_profile.jpg",
    url: "https://picsum.photos/200/300/",
    size: 185327,
  },
  {
    path: "missingPeopleId=1/searchHistoryId=1/step=FIRST/001-channels4_profile.jpg",
    url: "https://picsum.photos/200/300",
    size: 185327,
  },
  {
    path: "missingPeopleId=1/searchHistoryId=1/step=FIRST/001-channels4_profile.jpg",
    url: "https://picsum.photos/200/300",
    size: 185327,
  },
  {
    path: "missingPeopleId=1/searchHistoryId=1/step=FIRST/001-channels4_profile.jpg",
    url: "https://picsum.photos/200/300",
    size: 185327,
  },
  {
    path: "missingPeopleId=1/searchHistoryId=1/step=FIRST/001-channels4_profile.jpg",
    url: "https://picsum.photos/200/300",
    size: 185327,
  },
  {
    path: "missingPeopleId=1/searchHistoryId=1/step=FIRST/001-channels4_profile.jpg",
    url: "https://picsum.photos/200/300",
    size: 185327,
  },
  {
    path: "missingPeopleId=1/searchHistoryId=1/step=FIRST/001-channels4_profile.jpg",
    url: "https://picsum.photos/200/300",
    size: 185327,
  },
  {
    path: "missingPeopleId=1/searchHistoryId=1/step=FIRST/001-channels4_profile.jpg",
    url: "https://picsum.photos/200/300",
    size: 185327,
  },
];

function GuardianSelectImgPage() {
  const [selectedImg, setSelectedImg] = useState([]);
  const onSelect = (img) => {
    setSelectedImg((prev) => {
      if (prev.includes(img)) {
        return prev.filter((item) => item !== img);
      } else {
        return [...prev, img];
      }
    });
  };

  return (
    <StGuardianSelectImgPage>
      <SelectImgList onSelect={onSelect} data={selectedImg} />
      <AllResultList onSelect={onSelect} data={dummyData} selectedList={selectedImg} />
      <BottomContainer>
        <BottomButton>제출</BottomButton>
      </BottomContainer>
    </StGuardianSelectImgPage>
  );
}
export default GuardianSelectImgPage;

const StGuardianSelectImgPage = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  overflow: hidden;
  width: 100%;
  height: 100vh;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  width: 100%;
  background-color: white;
  padding: 3rem 5rem 7rem 5rem;
`;

const BottomButton = styled(Button)`
  width: 31.5rem;
  height: 12.5rem;
  border: none;
  border-radius: 2.5rem;
  background: #0580f1;
  color: #fff;

  text-align: center;
  font-family: Pretendard;
  font-size: 4rem;
  font-style: normal;
  font-weight: 500;
  line-height: 5.5rem;
`;
