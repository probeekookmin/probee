import styled from "styled-components";
import { useEffect, useState } from "react";
import { Form, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { postProfileImg } from "../../core/api";

/*의뢰인용 화면 - 프로필 업로드 컴포넌트 */
export const UploadImage = ({ id, profile }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    console.log("profile", profile);
    setImageUrl(profile);
  }, [profile]);

  const customRequest = async ({ file }) => {
    const formData = new FormData();
    formData.append("profile", file);

    try {
      const value = { id: id, profile: formData };
      const data = await postProfileImg(value);

      setImageUrl(data.data.url);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("업로드 실패.");
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
      setLoading(false);
      setImageUrl(info.file.originFileObj);
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
      <Form.Item name={"profile"} getValueFromEvent={({ file }) => file.originFileObj}>
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
    margin: 0 auto;
  }

  &.custom-uploader .ant-upload.ant-upload-select > .ant-upload {
    width: 25rem;
    height: 25rem;
  }

  &.custom-uploader .ant-upload.ant-upload-select > .ant-upload > button {
    font-size: 4.5rem;
    color: #a7a7a7;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지 비율 유지 및 카드에 꽉 차게 표시 */
  object-position: center; /* 이미지 중앙에 표시 */
  border-radius: 2rem;
`;
