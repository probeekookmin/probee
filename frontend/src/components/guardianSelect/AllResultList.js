import { List, Image, Button } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { CloseOutlined } from "@ant-design/icons";

/*1차 탐색 결과를 보여주는 리스트 */
export const AllResultList = ({ onSelect, data, selectedList }) => {
  return (
    <StAllResultList>
      <Title>1차 탐색 결과</Title>
      <ScrollContainer
        grid={{
          gutter: 25,
          xl: 3,
        }}
        dataSource={data}
        renderItem={(item) => (
          <ImageItem key={item.imgUrl} item={item} onSelect={onSelect} isSelected={selectedList.includes(item)} />
        )}
      />
    </StAllResultList>
  );
};

/*각 이미지 아이템 */
const ImageItem = ({ item, onSelect, isSelected }) => {
  const [isPreviewVisible, setPreviewVisible] = useState(false);

  return (
    <List.Item>
      <ItemImage
        className="custom-image"
        src={item.imgUrl}
        select={isSelected ? "true" : "false"}
        preview={{
          width: 900,
          visible: isPreviewVisible,
          closeIcon: <CloseOutlined />,
          onVisibleChange: (visible) => setPreviewVisible(visible),
          toolbarRender: () => (
            <BottomContainer onClick={(e) => e.stopPropagation()}>
              <BottomButton
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(item);
                  setPreviewVisible(false);
                }}>
                {isSelected ? "선택해제" : "선택"}
              </BottomButton>
            </BottomContainer>
          ),
        }}
        onClick={() => setPreviewVisible(true)}
      />
    </List.Item>
  );
};
const StAllResultList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  padding: 4.25rem 5rem;
  background-color: white;
  height: 100%;
  overflow: hidden;
  margin-top: 2.5rem;
`;

const Title = styled.p`
  color: #000;

  font-size: 4.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 5.5rem;
`;
const ScrollContainer = styled(List)`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-snap-align: center;
`;

const ItemImage = styled(Image)`
  &.custom-image {
    width: 27.5rem;
    height: 45rem;
    border-radius: 2.5rem;
    border: ${(props) => (props.select == "true" ? "1rem solid #0580F1" : "none")};
    &.ant-image-preview {
      width: 100%;
      background-color: #fff;
    }
    &.ant-image-preview-footer {
      width: 50%;
      right: 0;
    }
  }
  &.custom-image.ant-image-preview-close > .anticon {
    width: 60rem;
    font-size: 60rem;
  }
  &.custom-image.ant-image-preview-footer {
    width: 50%;
    right: 0;
  }
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
`;
