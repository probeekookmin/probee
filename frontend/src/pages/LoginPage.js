import styled from "styled-components";
import { Button, Form, Input, Typography } from "antd";
import Logo from "../assets/icons/logo_b.svg";
import Frame from "../assets/images/login_frame.svg";
import Float1 from "../assets/images/login_float1.svg";
import Float2 from "../assets/images/login_float2.svg";
import api from "../core/api/api";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../core/api";
import { useEffect } from "react";
import { GithubOutlined, HomeOutlined } from "@ant-design/icons";
const { Link } = Typography;

function LoginPage() {
  const url = "https://kookmin-sw.github.io/capstone-2024-14/";

  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("jwtToken");
  }, []);

  const onFinish = (fieldsValue) => {
    const values = {
      loginId: fieldsValue["id"],
      password: fieldsValue["password"],
    };
    console.log("Success:", values);
    postLogin(values).then((res) => {
      console.log(res);
      const token = res.data.jwtToken;
      console.log("token", token);
      localStorage.setItem("jwtToken", token);
      navigate("/"); // 로그인 후 메인 페이지로 이동
    });
  };
  return (
    <StLoginPage>
      <FrameImageContainer>
        <img src={Frame} />
      </FrameImageContainer>
      <Float1ImageContainer>
        <img src={Float1} />
      </Float1ImageContainer>
      <Float2ImageContainer>
        <img src={Float2} />
      </Float2ImageContainer>

      <ContentsContainer>
        <TitleContainer>
          <LogoContainer onClick={() => navigate("/")}>
            <img src={Logo} />
            <HomeButton type="link" icon={<HomeOutlined />}></HomeButton>
          </LogoContainer>

          <p>Welecome back to PROBEE.</p>
          <Typography>
            프로비 이용을 위해서는 권한이 필요합니다.
            <Link href="https://github.com/kookmin-sw/capstone-2024-14" target="_blank">
              Contact Us
            </Link>
          </Typography>
        </TitleContainer>
        <FormContainer className="custom-form" layout="vertical" requiredMark={false} colon={false} onFinish={onFinish}>
          <Form.Item
            label="아이디"
            name="id"
            rules={[
              {
                required: true,
                message: "아이디를 입력해주세요.",
              },
            ]}>
            <InputWrapper />
          </Form.Item>
          <Form.Item
            label="비밀번호"
            name="password"
            rules={[
              {
                required: true,
                message: "비밀번호를 입력해주세요.",
              },
            ]}>
            <InputPWWrapper />
          </Form.Item>
          <Form.Item>
            <ButtonWrapper type="primary" htmlType="submit">
              로그인
            </ButtonWrapper>
          </Form.Item>
        </FormContainer>
        <Button
          type="text"
          icon={<GithubOutlined />}
          onClick={() => {
            window.open(url);
          }}>
          PROBEE
        </Button>
      </ContentsContainer>
    </StLoginPage>
  );
}
export default LoginPage;

const StLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100vw;
  height: 100vh;
  padding: 0 2rem;
  background: linear-gradient(115deg, #f5f5f5 66.54%, #e8e8e8 97.46%);
`;

const floatAnimation = `
  @keyframes float {
    0% {
      transform: translatey(0px);
    }
    50% {
      transform: translatey(-10px);
    }
    100% {
      transform: translatey(0px);
    }
  }
`;

const sharedFloatStyle = `
display: flex;
justify-content: center;
position: absolute;
bottom: 0rem;
width: 100vw;
padding: 0 2rem;`;

const sharedImageStyle = `
width: 90%;
height: 90%;`;

const Float1ImageContainer = styled.div`
  ${sharedFloatStyle}
  img {
    ${sharedImageStyle}
    animation: float 4s ease-in-out infinite;
  }
  ${floatAnimation}
`;

const Float2ImageContainer = styled.div`
  ${sharedFloatStyle}
  img {
    ${sharedImageStyle}
    animation: float 3s ease-in-out infinite;
  }
  ${floatAnimation}
`;

const FrameImageContainer = styled.div`
  ${sharedFloatStyle}
  img {
    ${sharedImageStyle}
  }
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  width: 57rem;
  height: 65rem;
  padding: 6rem 4rem;
  margin: 1rem 0 7rem 0;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.4rem 0.6rem 0 rgba(0, 0, 0, 0.1);

  @media (max-width: 1900px) and (min-width: 1601px) {
    width: 50rem;
    height: 65rem;
  }
  @media (max-width: 1600px) and (min-width: 1301px) {
    width: 48rem;
    height: 55rem;
  }
  @media (max-width: 1300px) and (min-width: 1280px) {
    width: 48rem;
    height: 55rem;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  margin-bottom: 8rem;

  img {
    width: 26rem;
    margin-bottom: 2rem;
  }

  p {
    font-size: 2.1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.24rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HomeButton = styled(Button)`
  margin-bottom: 2rem;
`;

const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;

  &.ant-form-vertical .ant-form-item {
    width: 100%;
    margin-bottom: 2rem;
  }
`;

const InputWrapper = styled(Input)`
  width: 100%;
  height: 4rem;
`;
const InputPWWrapper = styled(Input.Password)`
  width: 100%;
  height: 4rem;
`;

const ButtonWrapper = styled(Button)`
  width: 100%;
  height: 4rem;
  margin-top: 2rem;
`;
