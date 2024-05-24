import { List, Image, Button, Modal, Empty } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const SelectImgList = ({ onSelect, data }) => {
  const [openPreview, setOpenPreview] = useState(false);

  const handleOpen = () => {
    setOpenPreview(true);
  };
  const handleClose = () => {
    setOpenPreview(false);
  };
  useEffect(() => {}, [data]);

  return (
    <StSelectImgList>
      <CountText>선택한 이미지({data.length})</CountText>
      <ScrollContainer>
        {data && data.length > 0 ? (
          data.map((item) => (
            <ImageItem
              key={`select-${item.resultId}`}
              className="custom-image"
              src={item.imgUrl}
              onClick={() => setOpenPreview(true)}
              // preview={false}
              preview={{
                width: 900,
                toolbarRender: () => (
                  <BottomContainer>
                    <BottomButton onClick={() => onSelect(item)}>선택해제</BottomButton>
                  </BottomContainer>
                ),
              }}
            />
          ))
        ) : (
          <EmptyContainer>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </EmptyContainer>
        )}
      </ScrollContainer>
    </StSelectImgList>
  );
};

const StSelectImgList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  padding: 5rem;
  gap: 5rem;
`;

const CountText = styled.p`
  color: #000;
  font-size: 4.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 5.5rem;
`;

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  width: 100%;
  height: 33rem;
  white-space: nowrap;
  overflow: scroll;

  /* -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-snap-align: center; */
`;

const ImageItem = styled(Image)`
  &.custom-image {
    width: 20rem;
    height: 32.5rem;
    border-radius: 2.5rem;
  }
  display: flex;
  width: 20rem;
  height: 32.5rem;
  border-radius: 2.5rem;
`;

const PreviewModal = styled(Modal)`
  &.custom-modal {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0;
    background: none;
  }
  &.ant-modal .ant-modal-content {
    width: 100%;
    background: none;
    /* padding: 0; */
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: none;
  }

  &.ant-modal .ant-modal-body {
    width: 100%;
    padding: 0;
    display: flex;
    justify-content: center;
  }

  &.ant-modal .ant-modal-footer {
    float: right;
  }
`;
const PreviewItem = styled(Image)`
  &.custom-image {
    width: 87.5rem;
    height: 143rem;
    border-radius: 2.5rem;
  }
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 2.5rem;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;

  width: 100%;
  padding: 3.9rem 5rem;
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
  right: 0;
`;
const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;
