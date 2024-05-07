import { Form, Upload, message } from "antd";
import styled from "styled-components";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { postProfileImg } from "../../core/api";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const UploadImage = ({ id }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const customRequest = async ({ file }) => {
    const formData = new FormData();
    formData.append("profile", file);

    try {
      const value = { id: id, profile: formData };

      console.log("FormData 내용 확인:");
      const profileFile = formData.get("profile");
      console.log("Profile 파일 객체:", profileFile);

      const data = await postProfileImg(value);
      console.log("File uploaded successfully:", data);
      // 성공 시 처리할 내용 추가s
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("업로드 실패.");
      // 실패 시 처리할 내용 추가
    }
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return false; // 잘못된 파일 형식이면 업로드를 중단합니다.
    }

    // 파일이 올바른 형식이면 customRequest 함수를 호출하여 파일을 업로드합니다.
    customRequest({ file });

    return false; // 파일 업로드를 수동으로 처리하기 때문에 false 반환
  };

  const handleChange = (info) => {
    console.log("info", info);
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      setLoading(false);
      setImageUrl(info.file.originFileObj);
      // getBase64(info.file.originFileObj, (url) => {
      //   console.log("url", url);
      //   setLoading(false);
      //   setImageUrl(url);
      // });
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

  return (
    <StUploadImage>
      <Form.Item getValueFromEvent={({ file }) => file.originFileObj}>
        <UploadWrapper
          className="custom-uploader"
          accept="image/png, image/jpeg"
          listType="picture-card"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          customRequest={customRequest}>
          {imageUrl ? <StyledImage src={imageUrl} alt="avatar" /> : uploadButton}
        </UploadWrapper>
      </Form.Item>
    </StUploadImage>
  );
};

const StUploadImage = styled.div``;

const UploadWrapper = styled(Upload)`
  &.custom-uploader .ant-upload.ant-upload-select {
    width: 25rem;
    height: 25rem;
    background: #fdfdfd;
    border: 0.2rem solid #f2f2f2;
    border-radius: 2.5rem;
  }

  &.custom-uploader .ant-upload.ant-upload-select > .ant-upload {
    width: 25rem;
    height: 25rem;
  }

  /* you need to customise top and left css attribute */
  &.custom-uploader .ant-upload.ant-upload-select > .ant-upload > button {
    font-size: 4.5rem;
    color: #a7a7a7;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지 비율 유지 및 카드에 꽉 차게 표시 */
  border-radius: 50%; /* 원형 이미지 효과를 위해 */
`;
