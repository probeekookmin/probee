import styled from "styled-components";
import { Row, Col, Typography, Divider, Form, Skeleton, Image } from "antd";
import { useEffect } from "react";
import { HorizontalInputForm, InputForm } from "../common/InputForm";

export const IntelligentBasicInfo = ({ data }) => {
  const [form] = Form.useForm();

  // 실종자 정보 적용
  useEffect(() => {
    form.setFieldsValue({
      name: data.missingPeopleName,
      birth: data.birthdate,
      gender: data.gender == "woman" ? "여성" : "남성",
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

  return (
    // <StIntelligentBasicInfo>
    //   <Form form={form} layout="vertical">
    //     <Row gutter={15}>
    //       <Col span={12}>
    //         <Row>
    //           <Col span={24}>
    //             <Typography.Title level={5}> </Typography.Title>
    //           </Col>
    //           <Col span={11}>
    //             <Skeleton.Image active={false} style={{ width: "13rem", height: "16rem" }} />
    //           </Col>
    //           <Col span={13}>
    //             <Row>
    //               <Col span={24}>
    //                 <InputForm label={"성명"} name={"name"} />
    //               </Col>
    //               <Col span={17}>
    //                 <InputForm label={"생년월일"} name={"birth"} />
    //               </Col>
    //               <Col span={7}>
    //                 <InputForm label={"성별"} name={"gender"} />
    //               </Col>
    //               <Col span={24}>
    //                 <InputForm label={"실종일시"} name={"missingTime"} />
    //               </Col>
    //               <Col span={24}>
    //                 <InputForm label={"실종장소"} name={"missingLocation"} />
    //               </Col>
    //             </Row>
    //           </Col>
    //         </Row>
    //       </Col>
    //       <Col span={1}>
    //         <Divider type="vertical" style={{ height: "100%" }} />
    //       </Col>

    //       <Col span={10}>
    //         <Col>
    //           <Typography.Title level={5}>착장정보</Typography.Title>
    //         </Col>
    //         <Col>
    //           <Skeleton title={false} />
    //         </Col>
    //       </Col>
    //     </Row>

    //     {/* <Col span={11}>
    //       <Typography.Title
    //         level={5}
    //         style={{
    //           margin: 0,
    //         }}>
    //         착장정보
    //       </Typography.Title>
    //     </Col> */}
    //   </Form>
    // </StIntelligentBasicInfo>
    <StIntelligentBasicInfo>
      <InfoForm form={form}>
        <ImageContainer>
          {data.profileImage ? (
            <ImageWrapper className="custom-image" src={data.profileImage} alt="Profile" />
          ) : (
            <Skeleton.Image active={false} />
          )}
        </ImageContainer>
        <ContentsContainer>
          <Row style={{ width: "100%" }}>
            {/* <Col span={13}>
              <HorizontalInputForm label={"성명"} name={"name"} />
            </Col> */}
            <Col span={11}>
              <HorizontalInputForm label={"성별"} name={"gender"} />
            </Col>
            <Col span={13}>
              <HorizontalInputForm label={"생년월일"} name={"birth"} />
            </Col>
            <Col span={24}>
              <HorizontalInputForm label={"실종일시"} name={"missingTime"} />
            </Col>

            <Col span={24}>
              {" "}
              <HorizontalInputForm label={"실종장소"} name={"missingLocation"} />
            </Col>

            <Col span={24}></Col>
          </Row>
        </ContentsContainer>
      </InfoForm>
    </StIntelligentBasicInfo>
  );
};

const StIntelligentBasicInfo = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  border-radius: 1.5rem;
  background-color: white;
`;

const InfoForm = styled(Form)`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  width: 100%;
  gap: 2rem;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 14rem;
  height: 17rem;
  @media all and (max-width: 1536px) {
    width: 12rem;
    height: 15rem;
    object-fit: cover;
  }
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
  &.custom-image.ant-imag {
    width: 14rem;
    height: 17rem;
    @media all and (max-width: 1536px) {
      width: 12rem;
      height: 15rem;
      object-fit: cover;
    }
  }
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
