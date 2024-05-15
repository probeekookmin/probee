import styled from "styled-components";
import { useEffect } from "react";
import { Typography, Image, Skeleton, Form, Input, Row, Col } from "antd";
import { InputForm } from "../common/InputForm";

export const BasicInfo = ({ data }) => {
  const [form] = Form.useForm();
  console.log("BasicInfo", data);
  // 실종자 정보 적용
  useEffect(() => {
    console.log("BasicInfo-useEffect", data);
    form.setFieldsValue({
      name: data.missingPeopleName,
      birth: data.birthdate,
      gender: data.gender,
      missingTime:
        String(data.missingAt).split("T")[0] +
        " " +
        String(String(data.missingAt).split("T")[1]).split(":")[0] +
        "시 경", // todo :함수화 필요
      missingLocation: data.missingLocation,
      guardianName: data.guardianName,
      relation: data.relationship,
      guardianContact: data.phoneNumber,
      koQuery: data.koQuery, //착장정보 한국어
    });
  }, [data]);

  // 실종자 정보 적용
  // useEffect(() => {
  //   form.setFieldsValue({
  //     name: "홍길동",
  //     birth: "1999.01.01",
  //     gender: "남성",
  //     missingTime: "2021.08.01 12:00" + "경",
  //     missingLocation: "서울시 강남구",
  //     guardianName: "김영희",
  //     relation: "부",
  //     guardianContact: "010-1234-5678",
  //     profileImage:
  //       "https://spring-server-image-storage.s3.ap-northeast-2.amazonaws.com/missingPeopleId=1/profile/001.PNG",
  //   });
  // }, []);

  /* 실종자 정보 영역 */
  const MissingPersonInfo = () => {
    return (
      // <InfoContainer>
      //   <Typography.Title level={5}>실종자 정보</Typography.Title>
      //   <MissingPersonForm form={form} layout="vertical">
      //     <Row>
      //       <Col span={11}>
      //         {/* <Skeleton.Image active={false} style={{ width: "13rem", height: "16rem" }} /> */}
      //         {data.profileImage ? (
      //           <img src={data.profileImage} alt="Profile" style={{ width: "13rem", height: "16rem" }} />
      //         ) : (
      //           <Skeleton.Image active={false} style={{ width: "13rem", height: "16rem" }} />
      //         )}
      //       </Col>
      //       <Col span={13}>
      //         <InputForm label={"성명"} name={"name"} />
      //         <Row>
      //           <Col span={16}>
      //             <InputForm label={"생년월일"} name={"birth"} />
      //           </Col>
      //           <Col span={8}>
      //             <InputForm label={"성별"} name={"gender"} />
      //           </Col>
      //         </Row>
      //         <InputForm label={"실종일시"} name={"missingTime"} />
      //         <InputForm label={"실종장소"} name={"missingLocation"} />
      //       </Col>
      //     </Row>
      //   </MissingPersonForm>
      // </InfoContainer>

      <InfoContainer>
        <Title>실종자 정보</Title>
        <MissingPersonForm form={form} layout="vertical">
          <ImageContainer>
            {data.profileImage ? (
              <ImageWrapper className="custom-image" src={data.profileImage} alt="Profile" />
            ) : (
              <Skeleton.Image active={false} />
            )}
          </ImageContainer>
          <ContentsContainer>
            <Row gutter={8} style={{ width: "100%" }}>
              <Col span={24}>
                <InputForm label={"성명"} name={"name"} />
              </Col>
              <Col span={14}>
                <InputForm label={"생년월일"} name={"birth"} />
              </Col>
              <Col span={10}>
                <InputForm label={"성별"} name={"gender"} />
              </Col>
              <Col span={24}>
                <InputForm label={"실종일시"} name={"missingTime"} />
              </Col>
              <Col span={24}>
                <InputForm label={"실종장소"} name={"missingLocation"} />
              </Col>
            </Row>
          </ContentsContainer>
        </MissingPersonForm>
      </InfoContainer>
    );
  };

  /* 보호자 정보 영역 */
  const GuardianInfo = () => {
    return (
      // <InfoContainer>
      //   <Typography.Title level={5}>보호자 정보</Typography.Title>
      //   <InfoForm form={form} layout="vertical">
      //     <Row>
      //       <Col span={7}>
      //         <InputForm label={"보호자명"} name={"guardianName"} />
      //       </Col>
      //       <Col span={4}>
      //         <InputForm label={"관계"} name={"relation"} />
      //       </Col>
      //       <Col span={13}>
      //         <InputForm label={"보호자 연락처"} name={"guardianContact"} />
      //       </Col>
      //     </Row>
      //   </InfoForm>
      // </InfoContainer>
      <InfoContainer>
        <Title>보호자 정보</Title>
        <InfoForm form={form} layout="vertical">
          <GuardianContentsContainer>
            <InputForm label={"보호자명"} name={"guardianName"} />
            <InputForm label={"관계"} name={"relation"} />
            <InputForm label={"보호자 연락처"} name={"guardianContact"} />
          </GuardianContentsContainer>
        </InfoForm>
      </InfoContainer>
    );
  };

  /* 착장정보 영역 */
  const WearingInfo = () => {
    return (
      // <InfoContainer>
      //   <Typography.Title level={5}>착장 정보</Typography.Title>
      //   <InfoForm form={form} layout="vertical">
      //     <Row>
      //       <Col span={24}>
      //         <StyledParagraph>{data.koQuery}</StyledParagraph>
      //       </Col>
      //     </Row>
      //   </InfoForm>
      // </InfoContainer>
      <InfoContainer>
        <Title>착장 정보</Title>
        <InfoForm form={form} layout="vertical">
          <StyledParagraph>{data.koQuery}</StyledParagraph>
        </InfoForm>
      </InfoContainer>
    );
  };

  /* 특이사항 영역 */
  const DescInfo = () => {
    return (
      // <InfoContainer>
      //   <Typography.Title level={5}>착장 정보</Typography.Title>
      //   <InfoForm form={form} layout="vertical">
      //     <Row>
      //       <Col span={24}>
      //         <StyledParagraph>{data.koQuery}</StyledParagraph>
      //       </Col>
      //     </Row>
      //   </InfoForm>
      // </InfoContainer>
      <InfoContainer>
        <Title>특이사항</Title>
        <InfoForm form={form} layout="vertical">
          <StyledParagraph>{data.koQuery}</StyledParagraph>
        </InfoForm>
      </InfoContainer>
    );
  };

  return (
    <StBasicInfo>
      <MissingPersonInfo />
      <GuardianInfo />
      <WearingInfo />
      <DescInfo />
    </StBasicInfo>
  );
};

const StBasicInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  flex: 1;
  width: 100%;
  height: 100%;

  padding: 1.5rem 1.5rem;

  border-radius: 1rem;
  background-color: white;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media all and (min-width: 1680px) {
    margin-bottom: 2rem;
  }
  @media all and (max-width: 1536px) {
    margin-bottom: 0.1rem;
  }
`;

const InfoForm = styled(Form)`
  display: flex;
`;

// 실종자 정보 영역
const MissingPersonForm = styled(Form)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 2rem;
`;

const Title = styled.p`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
  @media all and (max-width: 1536px) {
    font-size: 1.4rem;
  }
`;

//어떻게든 쿼리 보이게 해보려고 임시로 넣은 코드 - 종빈
const StyledParagraph = styled.p`
  margin-bottom: 0.5rem;
  white-space: pre-wrap; /* Preserve line breaks */
  font-size: 1.4rem;
  @media all and (max-width: 1537px) {
    font-size: 1.3rem;
  }
`;

const PersonInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  display: flex;
`;

const ImageWrapper = styled(Image)`
  &.custom-image {
    width: 14rem;
    height: 17rem;
    object-fit: cover;

    @media all and (max-width: 1536px) {
      width: 12rem;
      height: 15rem;
      object-fit: cover;
    }
  }
`;

const ContentsContainer = styled.div`
  display: flex;
  max-width: 17rem;
`;

const GuardianContentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
