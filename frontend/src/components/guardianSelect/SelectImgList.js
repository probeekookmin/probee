import { List, Image, Button } from "antd";
import { useState } from "react";
import styled from "styled-components";

export const SelectImgList = ({ onSelect, data }) => {
  return (
    <StSelectImgList>
      <CountText>선택한 이미지({data.length})</CountText>
      <ScrollContainer>
        {data.map((item, index) => (
          <ImageItem
            key={index}
            className="custom-image"
            src={item}
            preview={{
              toolbarRender: () => (
                <div>
                  <Button onClick={() => onSelect(item)}>선택해제</Button>
                </div>
              ),
            }}
          />
        ))}
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
