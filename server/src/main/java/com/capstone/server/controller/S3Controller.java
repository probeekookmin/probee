package com.capstone.server.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.capstone.server.code.ErrorCode;
import com.capstone.server.dto.S3UploadResponseDto;
import com.capstone.server.exception.CustomException;
import com.capstone.server.model.enums.Step;
import com.capstone.server.response.SuccessResponse;
import com.capstone.server.service.S3Service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;


@RequiredArgsConstructor
@RestController
public class S3Controller {
    private final S3Service s3Service;

    @PostMapping("/s3/upload")
    public ResponseEntity<?> s3Upload(@RequestPart(value = "image", required = false) MultipartFile image) {
        String setImageName = "testImage";
        S3UploadResponseDto profileImage = s3Service.upload(image, setImageName);
        return ResponseEntity.ok(profileImage);
    }

    @PostMapping("/s3/upload/list")
    public ResponseEntity<?> s3UploadList(@RequestPart(value = "images", required = false) List<MultipartFile> images) {
        String setImageName = "testImage";
        List<S3UploadResponseDto> profileImage = s3Service.upload(images, setImageName);
        return ResponseEntity.ok(profileImage);
    }
    
    @GetMapping("/s3/delete")
    public ResponseEntity<?> s3delete(@RequestParam String addr){
        s3Service.deleteImageFromS3(addr);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/s3/getUrl/{fileName}")
    public ResponseEntity<?> getUrld(@PathVariable String fileName) throws IOException {
        return ResponseEntity.ok(s3Service.getFileUrl(fileName));
    }

    @GetMapping("/s3/getPresignedUrl")
    public ResponseEntity<?> getPresignedUrl(@RequestParam String addr) throws IOException {
        return ResponseEntity.ok(s3Service.getPresignedUrl(addr));
    }

    @GetMapping("/s3/getFiles")
    public ResponseEntity<?> getFiles(@RequestParam String addr) throws IOException {
        return ResponseEntity.ok(s3Service.getFilesInFolder(addr));
    }

}