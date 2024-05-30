import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon, { CloseOutlined, RightOutlined } from "@ant-design/icons";

function HelpPage() {
  const navigate = useNavigate();

  return (
    <StHelpPage>
      <HeaderContainer>
        <CloseButton onClick={() => navigate("/m")}>
          <IconWrapper component={CloseOutlined} />
        </CloseButton>
        <Title>도움말</Title>
      </HeaderContainer>
      <ContentContainer>
        <ItemContainer onClick={() => navigate("/help/main")}>
          <p>메인화면 설명 확인하기</p>
          <IconWrapper component={RightOutlined} color="#9D9D9D" />
        </ItemContainer>
        <ItemContainer onClick={() => navigate("/help/select", { state: "help" })}>
          <p>이미지 선별 설명 확인하기</p>
          <IconWrapper component={RightOutlined} color="#9D9D9D" />
        </ItemContainer>
      </ContentContainer>
    </StHelpPage>
  );
}

export default HelpPage;

const StHelpPage = styled.div`
  display: flex;
  flex-direction: column;
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
  height: 14rem;
  top: 0;
  z-index: 1;

  padding: 2rem 5rem;

  background-color: white;
  /* box-shadow: 0 0.4rem 0.4rem 0 rgba(0, 0, 0, 0.1); */
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

const IconWrapper = styled(Icon)`
  font-size: 5rem;
  color: ${(props) => props.color || "black"};
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 5.5rem;
  font-weight: 600;
  color: black;
  margin-right: 8rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem 0;
  width: 100%;
  height: 100%;
  background-color: #f4f6f9;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 17rem;
  padding: 0 5rem;
  /* margin-bottom: 2rem; */
  background-color: white;
  border: 0.1rem solid #f2f2f2;
  /* border-radius: 2rem; */
  /* box-shadow: 0 0.4rem 0.6rem 0 rgba(0, 0, 0, 0.1); */
  &:hover {
    background-color: #f2f2f2;
  }

  p {
    font-size: 4.5rem;
  }
`;
