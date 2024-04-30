import { List, Image, Button } from "antd";
import styled from "styled-components";

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
          <List.Item>
            <ItemImage
              className="custom-image"
              //   width={"27.5rem"}
              //   height={"45rem"}
              src={item.url}
              preview={{
                width: 900,
                toolbarRender: () => (
                  <BottomContainer>
                    <BottomButton onClick={() => onSelect(item.url)}>
                      {selectedList.includes(item.url) ? "선택해제" : "선택"}
                    </BottomButton>
                  </BottomContainer>
                ),
              }}
            />
          </List.Item>
        )}
      />
    </StAllResultList>
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
  }

  &.custom-image .ant-image-preview-root .ant-image-preview-img {
    border-radius: 2.5rem;
  }
  &.custom-image .ant-image-preview-footer {
    display: flex;
    justify-content: center;
    align-items: end;
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
