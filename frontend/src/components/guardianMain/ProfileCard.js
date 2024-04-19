import styled from "styled-components";
import { CenterInputForm } from "../common/InputForm";
import { Form, Input, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { UploadImage } from "./UploadImage";
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //   message.error('Image must smaller than 2MB!');
  // }
  return isJpgOrPng;
};

export const ProfileCard = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}>
        Upload
      </div>
    </button>
  );
  const CenterInputForm = ({ label, name, lines }) => {
    return (
      <StCenterInputForm>
        <InputLabel>{label}</InputLabel>
        <InputItem name={name}>
          {lines ? (
            <InputField2
              variant="borderless"
              readOnly={"true"}
              autoSize={{
                minRows: 1,
                maxRows: 3,
              }}></InputField2>
          ) : (
            <InputField variant="borderless" readOnly={"true"} />
          )}
        </InputItem>
      </StCenterInputForm>
    );
  };
  return (
    <StProfileCard>
      <UploadImage />
      <CenterInputForm label={"성명"} name={"name"} />
      <CenterInputForm label={"생년월일"} name={"birth"} />
      <CenterInputForm label={"착장정보"} name={"wearingInfo"} lines={true} />
    </StProfileCard>
  );
};

const StProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 60rem;
  height: 84.25rem;
  padding: 5rem;
  border-radius: 2.5rem;
  border: 0.1rem solid #e0e0e0;
  /* @media (min-width: 992px) {
    width: 24rem;
    height: 33.7rem;
  } */
`;

const UploadContainer = styled(Upload).attrs({
  className: "upload-container",
})`
  .ant-upload-list-item {
    width: 25rem;
    height: 25rem;
  }
`;
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지 비율 유지 및 카드에 꽉 차게 표시 */
  border-radius: 50%; /* 원형 이미지 효과를 위해 */
`;

/* 각 정보 input 영역 */
const StCenterInputForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.6rem;
`;
const InputItem = styled(Form.Item)`
  padding: 0;
  margin: 0;
`;

const InputLabel = styled.span`
  padding-bottom: 0;
  color: #00000060;
  font-size: 3rem;
`;

const InputField = styled(Input)`
  padding: 0;
  color: black;
  font-size: 4.5rem;
  font-weight: bold;
  line-height: 140%;
  margin-bottom: 0.6rem;
  text-align: center;
  text-overflow: visible;
`;

const InputField2 = styled(Input.TextArea)`
  padding: 0;
  color: black;
  font-size: 3.75rem;
  font-weight: bold;
  line-height: 140%;
  margin-bottom: 0.6rem;
  text-align: center;
`;
