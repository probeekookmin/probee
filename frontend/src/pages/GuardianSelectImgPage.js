import styled from "styled-components";
import { SelectImgList } from "../components/guardianSelect/SelectImgList";
import { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { AllResultList } from "../components/guardianSelect/AllResultList";
import { Button, Modal } from "antd";
import { getGuardianSelectImage, postGuardianSelectImage } from "../core/api";
import Icon from "@ant-design/icons/lib/components/Icon";

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
    url: "https://picsum.photos/200/300?random=6",
    size: 185327,
  },
  {
    path: "missingPeopleId=1/searchHistoryId=1/step=FIRST/001-channels4_profile.jpg",
    url: "https://picsum.photos/200/300?random=7",
    size: 185327,
  },
  {
    path: "missingPeopleId=1/searchHistoryId=1/step=FIRST/001-channels4_profile.jpg",
    url: "https://picsum.photos/200/300?random=8",
    size: 185327,
  },
  {
    path: "missingPeopleId=1/searchHistoryId=1/step=FIRST/001-channels4_profile.jpg",
    url: "https://picsum.photos/200/300?random=9",
    size: 185327,
  },
  {
    path: "missingPeopleId=1/searchHistoryId=1/step=FIRST/001-channels4_profile.jpg",
    url: "https://picsum.photos/200/300?random=10",
    size: 185327,
  },
  {
    path: "missingPeopleId=1/searchHistoryId=1/step=FIRST/001-channels4_profile.jpg",
    url: "https://picsum.photos/200/300?random=11",
    size: 185327,
  },
  {
    path: "missingPeopleId=1/searchHistoryId=1/step=FIRST/001-channels4_profile.jpg",
    url: "https://picsum.photos/200/300?random=12",
    size: 185327,
  },
  {
    path: "missingPeopleId=1/searchHistoryId=1/step=FIRST/001-channels4_profile.jpg",
    url: "https://picsum.photos/200/300?random=13",
    size: 185327,
  },
  {
    path: "missingPeopleId=1/searchHistoryId=1/step=FIRST/001-channels4_profile.jpg",
    url: "https://picsum.photos/200/300?random=14",
    size: 185327,
  },
];

function GuardianSelectImgPage() {
  const [selectedImg, setSelectedImg] = useState([]);
  const [selctedImgId, setSelectedImgId] = useState([]);
  const [data, setData] = useState([]);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  useEffect(() => {
    getGuardianSelectImage().then((data) => {
      setData(data);
    });
  }, []);

  const onSelect = (select) => {
    setSelectedImg((prev) => {
      if (prev.includes(select)) {
        return prev.filter((item) => item !== select);
      } else {
        return [...prev, select];
      }
    });
  };

  const handleClose = {
    // 버튼 클릭 이벤트
    showModal: () => {
      setIsCancelModalOpen(true);
    },

    selectOK: () => {
      setIsCancelModalOpen(false);
    },
    selectCancel: () => {
      setIsCancelModalOpen(false);
    },
  };

  const handleSubmit = {
    // 버튼 클릭 이벤트
    showModal: () => {
      setIsSubmitModalOpen(true);
    },

    selectOK: () => {
      setIsSubmitModalOpen(false);
    },
    selectCancel: () => {
      setIsSubmitModalOpen(false);
    },
  };

  const onFinish = () => {
    const value = [
      selectedImg.map((item) => {
        return item.resultId;
      }),
    ];
    postGuardianSelectImage(value).then((data) => {
      console.log("finishData:", data);
    });
  };

  return (
    <StGuardianSelectImgPage>
      <HeaderContainer>
        <CloseButton onClick={() => handleClose.showModal()}>
          <CloseIcon component={CloseOutlined} />
        </CloseButton>
        <Title>탐색 이미지 선별</Title>
      </HeaderContainer>
      <SelectImgList onSelect={onSelect} data={selectedImg} />
      <AllResultList onSelect={onSelect} data={data} selectedList={selectedImg} />
      <BottomContainer>
        <BottomButton onClick={() => handleSubmit.showModal()}>제출</BottomButton>
      </BottomContainer>

      <ModalContainer
        className="custom-modal"
        title="이미지 선별을 그만 두시겠습니까?"
        open={isCancelModalOpen}
        onOk={handleClose.selectOK}
        onCancel={handleClose.selectCancel}
        okText="예"
        cancelText="아니오">
        <p>중단하면 선택했던 이미지 정보는 삭제됩니다.</p>
      </ModalContainer>
      <ModalContainer
        className="custom-modal"
        title="선택한 이미지를
        제출하시겠습니까?"
        open={isSubmitModalOpen}
        onOk={handleSubmit.selectOK}
        onCancel={handleSubmit.selectCancel}
        okText="예"
        cancelText="아니오">
        <p>제출 후에는 선택한 이미지를 변경할 수 없어요.</p>
      </ModalContainer>
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

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 12.5rem;
  top: 0;

  padding: 0 5rem;

  background-color: white;
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11rem;
  height: 11rem;

  &:hover {
    background-color: #f2f2f2;
    border-radius: 2rem;
  }
`;

const CloseIcon = styled(Icon)`
  font-size: 5rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 5.5rem;
  font-weight: 600;
  color: black;
  margin-right: 5rem;
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

const ModalContainer = styled(Modal)`
  &.custom-modal {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }

  &.ant-modal .ant-modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 57.5rem;
    min-width: 86.5rem;
    max-width: 125rem;
    min-height: 57.5rem;
    max-height: 75rem;

    margin-bottom: 60rem;
    padding: 4rem 4.5rem;

    box-shadow: none;
    border-radius: 5rem;
  }

  &.ant-modal .ant-modal-body {
    width: 100%;
    padding: 0;
    display: flex;
    justify-content: center;
    width: 48rem;
    margin-bottom: 7rem;
    p {
      font-size: 3.75rem;
      font-style: normal;
      font-weight: 400;
      line-height: 140%;
      text-align: center;
      word-break: keep-all;
    }
  }

  &.ant-modal .ant-modal-title {
    width: 45rem;
    margin-bottom: 2.5rem;
    font-size: 5rem;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    text-align: center;
    word-break: keep-all;
  }

  &.ant-modal .ant-modal-footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }
  &.ant-modal .ant-modal-footer .ant-btn {
    width: 35rem;
    height: 12.5rem;
    border-radius: 2.5rem;
    span {
      font-size: 4rem;
      font-style: normal;
      font-weight: 500;
      line-height: 5.5rem;
    }
  }

  &.ant-modal .ant-modal-footer .ant-btn-default {
    background: #dedede;
  }
`;
