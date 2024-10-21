package com.capstone.server.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import com.capstone.server.code.ErrorCode;
import com.capstone.server.dto.S3DownloadResponseDto;
import com.capstone.server.dto.S3UploadResponseDto;
import com.capstone.server.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@Service
public class S3Service {
    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucketName}")
    private String bucketName;

    public List<S3UploadResponseDto> upload(List<MultipartFile> images, String imagePath) {
        this.isEmptyImages(images);
        List<S3UploadResponseDto> s3UploadResponseDtos = new ArrayList<S3UploadResponseDto>();

        for (int i = 0; i < images.size(); i++) {
            MultipartFile image = images.get(i);
            String index = String.format("%03d", i + 1); // 3자리로 패딩된 숫자 포맷
            String originalFileName = image.getOriginalFilename();
            String imageNameWithoutExtension = originalFileName.substring(0, originalFileName.lastIndexOf('.'));
            String imageName = imagePath + index + "-" + imageNameWithoutExtension;
            s3UploadResponseDtos.add(upload(image, imageName));
        }

        return s3UploadResponseDtos;
    }

    public S3UploadResponseDto upload(MultipartFile image, String imageName) {
        if (image.isEmpty() || Objects.isNull(image.getOriginalFilename())) {
            // TODO : 에러 수정
            throw new CustomException(ErrorCode.USER_EXISTS);
        }
        return new S3UploadResponseDto(this.uploadImage(image, imageName), imageName);
    }

    public List<S3DownloadResponseDto> download(String imagePath) {
        List<S3DownloadResponseDto> s3DownloadResponseDtos = new ArrayList<S3DownloadResponseDto>();

        List<S3ObjectSummary> s3ObjectSummaries = this.getFilesInFolder(imagePath);

        if (s3ObjectSummaries.isEmpty() || Objects.isNull(s3ObjectSummaries.get(0))) {
            // TODO : 에러 수정
            throw new CustomException(ErrorCode.USER_EXISTS);
        }

        for (S3ObjectSummary summary : s3ObjectSummaries) {
            s3DownloadResponseDtos.add(this.download(summary, imagePath));
        }

        return s3DownloadResponseDtos;
    }

    private S3DownloadResponseDto download(S3ObjectSummary summary, String imagePath) {
        S3DownloadResponseDto s3DownloadResponseDto = S3DownloadResponseDto.fromSummary(summary);
        s3DownloadResponseDto.setUrl(getPresignedUrl(summary.getKey()));
        return s3DownloadResponseDto;
    }

    public String getFileUrl(String fileName) {
        return amazonS3.getUrl(bucketName, fileName).toString();
    }

    public String getPresignedUrl(String fileName) {
        GeneratePresignedUrlRequest request = new GeneratePresignedUrlRequest(bucketName, fileName)
                .withMethod(HttpMethod.GET); // GET 메서드를 사용하는 서명 URL 생성

        URL url = amazonS3.generatePresignedUrl(request);

        return url.toString();
    }

    public List<S3ObjectSummary> getFilesInFolder(String folderName) {
        ListObjectsV2Result filesInFolder = amazonS3.listObjectsV2(bucketName, folderName);

        List<S3ObjectSummary> objectSummaries = filesInFolder.getObjectSummaries();


        return objectSummaries;
    }

    public void deleteImageFromS3(String imageAddress) {
        String key = getKeyFromImageAddress(imageAddress);
        try {
            amazonS3.deleteObject(new DeleteObjectRequest(bucketName, key));
        } catch (Exception e) {
            // TODO : 에러 수정
            throw new CustomException(ErrorCode.USER_EXISTS);
        }
    }

    private String uploadImage(MultipartFile image, String imageName) {
        this.validateImageFileExtention(image.getOriginalFilename()); // 확장자 검사
        try {
            return this.uploadImageToS3(image, imageName);
        } catch (IOException e) {
            // TODO : 에러 수정
            throw new CustomException(ErrorCode.USER_EXISTS);
        }
    }

    private void validateImageFileExtention(String filename) {
        int lastDotIndex = filename.lastIndexOf(".");
        if (lastDotIndex == -1) {
            // TODO : 에러 수정
            throw new CustomException(ErrorCode.USER_EXISTS);
        }

        String extension = filename.substring(lastDotIndex + 1).toLowerCase();
        List<String> allowedExtentionList = Arrays.asList("jpg", "jpeg", "png", "gif");

        if (!allowedExtentionList.contains(extension)) {
            // TODO : 에러 수정
            throw new CustomException(ErrorCode.USER_EXISTS);
        }
    }

    private String uploadImageToS3(MultipartFile image, String imageName) throws IOException {
        String originalFilename = image.getOriginalFilename(); //원본 파일 명
        String extension = originalFilename.substring(originalFilename.lastIndexOf(".")); //확장자 명

        // TODO : 함수로 구현
        String s3FileName = imageName + extension; //변경된 파일 명

        InputStream is = image.getInputStream();
        byte[] bytes = IOUtils.toByteArray(is);

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType("image/" + extension);
        metadata.setContentLength(bytes.length);
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);

        try {
            PutObjectRequest putObjectRequest =
                    new PutObjectRequest(bucketName, s3FileName, byteArrayInputStream, metadata);
            amazonS3.putObject(putObjectRequest); // put image to S3
        } catch (Exception e) {
            // TODO : 에러 수정
            throw new CustomException(ErrorCode.USER_EXISTS);
        } finally {
            byteArrayInputStream.close();
            is.close();
        }

        // return amazonS3.getUrl(bucketName, s3FileName).toString();
        return this.getPresignedUrl(s3FileName);
    }

    private String getKeyFromImageAddress(String imageAddress) {
        try {
            URL url = new URL(imageAddress);
            String decodingKey = URLDecoder.decode(url.getPath(), "UTF-8");
            return decodingKey.substring(1); // 맨 앞의 '/' 제거
        } catch (MalformedURLException | UnsupportedEncodingException e) {
            // TODO : 에러 수정
            throw new CustomException(ErrorCode.USER_EXISTS);
        }
    }

    private void isEmptyImages(List<MultipartFile> images) {
        if (images == null || images.isEmpty()) {
            // TODO : 에러 수정
            throw new CustomException(ErrorCode.BAD_REQUEST);
        }
    }
}