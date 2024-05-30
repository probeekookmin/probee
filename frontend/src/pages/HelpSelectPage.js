import styled from "styled-components";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon, { LeftOutlined, RightOutlined } from "@ant-design/icons";
import HelpSelect1 from "../assets/images/help_select1.svg";
import HelpSelect2 from "../assets/images/help_select2.svg";
import HelpSelect3 from "../assets/images/help_select3.svg";
import HelpSelect4 from "../assets/images/help_select4.svg";
import HelpSelect5 from "../assets/images/help_select5.svg";

function HelpSelectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pre } = location.state || { pre: "main" };

  const [index, setIndex] = useState(0);
  const images = [HelpSelect1, HelpSelect2, HelpSelect3, HelpSelect4, HelpSelect5];

  const handleNext = () => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    } else {
      if (pre === "main") navigate("/m");
      else navigate("/help");
    }
  };
  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <StHelpPage color={index == 1 || index == 3 ? "true" : "false"}>
      <HeaderContainer>
        <ButtonWrapper onClick={() => handlePrev()}>
          {index > 0 && <IconWrapper component={LeftOutlined} />}
        </ButtonWrapper>
        <Title>이미지 선별 설명</Title>
        <ButtonWrapper onClick={() => handleNext()}>
          <IconWrapper component={RightOutlined} />
        </ButtonWrapper>
      </HeaderContainer>
      <ContentContainer>
        <img src={images[index]} />
      </ContentContainer>
    </StHelpPage>
  );
}

export default HelpSelectPage;

const StHelpPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  padding: 0;

  background-color: ${(props) => (props.color == "true" ? "#272727" : "#404040")};

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

  /* background-color: #404040; */
  opacity: 0.8;
  /* box-shadow: 0 0.4rem 0.4rem 0 rgba(0, 0, 0, 0.1); */
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11rem;
  height: 11rem;
  &:hover {
    background-color: #404040;
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
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0;
  margin-top: 13rem;
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
