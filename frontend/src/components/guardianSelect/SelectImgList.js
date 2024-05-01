import { List, Image, Button } from "antd";
import { useState } from "react";
import styled from "styled-components";

export const SelectImgList = ({ onSelect, data }) => {
  return (
    <StSelectImgList>
      <CountText>선택한 이미지({data.length})</CountText>
      {/* <ListContainer
        grid={{
          gutter: 25,
          xl: 4,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Image
              width={"20rem"}
              height={"32.5rem"}
              src={item}
              preview={{
                toolbarRender: () => (
                  <div>
                    <Button onClick={() => onSelect(item)}>선택해제</Button>
                  </div>
                ),
              }}
            />
          </List.Item>
        )}
      /> */}
      <ScrollContainer>
        {data.map((url, index) => {
          return (
            <ImageItem
              key={index}
              width={"20rem"}
              height={"32.5rem"}
              src={url}
              preview={{
                toolbarRender: () => (
                  <div>
                    <Button onClick={() => onSelect(url)}>선택해제</Button>
                  </div>
                ),
              }}
            />
          );
        })}
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

const ListContainer = styled(List)`
  width: 100%;
  height: 100%;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-snap-align: center;
`;

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  width: 100vw;
  height: 32.5rem;
  overflow: scroll;
  white-space: nowrap;

  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-snap-align: center;
`;

const ImageItem = styled(Image)`
  width: 20rem;
  height: 32.5rem;
  border-radius: 2.5rem;
`;
