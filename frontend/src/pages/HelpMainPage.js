import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon, { LeftOutlined, RightOutlined } from "@ant-design/icons";
import HelpMainImage from "../assets/images/help_main.svg";

function HelpMainPage() {
  const navigate = useNavigate();

  return (
    <StHelpPage>
      <HeaderContainer>
        <CloseButton onClick={() => navigate("/help")}>
          <IconWrapper component={LeftOutlined} />
        </CloseButton>
        <Title>메인화면 설명</Title>
      </HeaderContainer>
      <ContentContainer>
        <img src={HelpMainImage} />
      </ContentContainer>
    </StHelpPage>
  );
}

export default HelpMainPage;

const StHelpPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  padding: 0;

  background-color: #404040;

  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-snap-align: center;
`;
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 14rem;
  top: 0;
  z-index: 1;

  padding: 2rem 5rem;

  background-color: #404040;
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
  color: ${(props) => props.color || "white"};
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 5.5rem;
  font-weight: 600;
  color: white;
  margin-right: 8rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0;
  /* margin-top: 10rem; */
  background-color: #404040;

  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-snap-align: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
