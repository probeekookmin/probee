package com.capstone.server.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import com.capstone.server.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.capstone.server.code.ErrorCode;
import com.capstone.server.exception.CustomException;
import com.capstone.server.model.enums.Step;
import com.capstone.server.response.SuccessResponse;
import com.capstone.server.service.DetectService;
import com.capstone.server.service.MissingPeopleService;

import com.capstone.server.service.S3Service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Slf4j
@RestController
@RequestMapping("/api/missing-people")
public class MissingPeopleController {

    @Autowired
    private MissingPeopleService missingPeopleService;
    @Autowired
    private S3Service s3Service;
    @Autowired
    private DetectService detectService;

    // MissingPeople 전체 가져오기
    @GetMapping()
    public ResponseEntity<?> getAllMissingPeople() {
        List<MissingPeopleResponseDto> missingPeopleResponseDtos = missingPeopleService.getAllMissingPeople();
        return ResponseEntity.ok().body(new SuccessResponse(missingPeopleResponseDtos));
    }

    // MissingPeople 하나 가져오기
    @GetMapping("/{id}")
    public ResponseEntity<?> getMissingPeopleById(@PathVariable Long id) {
        MissingPeopleResponseDto missingPeopleResponseDto = missingPeopleService.getMissingPeopleById(id);
        return ResponseEntity.ok().body(new SuccessResponse(missingPeopleResponseDto));
    }

    // TODO : AI 모델 탐색 코드 추가

    @PostMapping() 
    public ResponseEntity<?> createMissingPeople(@Validated @RequestBody MissingPeopleCreateRequestDto missingPeopleCreateRequestDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();

            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomException(ErrorCode.BAD_REQUEST, errorMap);
        } else {
            return ResponseEntity.ok().body(new SuccessResponse(missingPeopleService.createMissingPeople(missingPeopleCreateRequestDto)));
        }
    }
    // 현재 테스트 용이성을 위해 테스트용 url로 분리하였음. 추후 결합
    @PostMapping("/totalCreateTest")
    public ResponseEntity<?> totalTest(@Validated @RequestBody MissingPeopleCreateRequestDto missingPeopleCreateRequestDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();

            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomException(ErrorCode.BAD_REQUEST, errorMap);
        } else {
            //DB에 실종자 정보 등록
            MissingPeopleCreateResponseDto createResponse =  missingPeopleService.createMissingPeople(missingPeopleCreateRequestDto);
            //생성된 MissingpeopleId와 searchid로 탐색 todo : 서버 코드에따라서 error처리 해야함
            detectService.callDetectAPI(createResponse.getId());
            return ResponseEntity.ok().body(createResponse);
        }
    }
    //todo : 서버에 연산결과 등록
    @PostMapping("/detect")
    public ResponseEntity<?> uploadDetectResult(@Validated @RequestBody DetectionResultDto detectionResultDto) {
        System.out.println(detectionResultDto);
        return ResponseEntity.ok().body(new SuccessResponse("ss"));
    }

    @PostMapping("/{id}/profile")
    public ResponseEntity<?> uploadProfileImageToS3 (
        @RequestPart(value = "profile", required = false) MultipartFile image,
        @PathVariable Long id
        ) {
            if (image == null || image.isEmpty()) {
                // TODO : 에러 수정
                throw new CustomException(ErrorCode.BAD_REQUEST);
            }

            String imageName = String.format("missingPeopleId=%d/profile/001", id);
            return ResponseEntity.ok().body(new SuccessResponse(missingPeopleService.uploadImageToS3(image, imageName, id)));
    }

    @GetMapping("/{id}/profile")
    public ResponseEntity<?> getProfilePresignedUrl(@PathVariable Long id) {
        String imagePath = String.format("missingPeopleId=%d/profile", id);
        return ResponseEntity.ok(new SuccessResponse(missingPeopleService.downloadImageFromS3(imagePath, id)));
    }


    @PostMapping("/{id}/search-history/{searchHistoryId}/step/{step}")
    public ResponseEntity<?> uploadProfileImageToS3(
        @RequestPart(value = "result", required = false) List<MultipartFile> images,
        @PathVariable Long id,
        @PathVariable Long searchHistoryId,
        @PathVariable String step
        ){
            if(images == null || images.isEmpty() || Objects.isNull(images.get(0))) {
                // TODO : 에러 수정
                throw new CustomException(ErrorCode.USER_EXISTS);
            }

            Step stepValue = Step.valueOf(step.toUpperCase()); 
            String imagePath = String.format("missingPeopleId=%d/searchHistoryId=%d/step=%s/", id, searchHistoryId, stepValue.toString());
            return ResponseEntity.ok().body(new SuccessResponse(missingPeopleService.uploadImagesToS3(images, imagePath, id, searchHistoryId)));
    }

    @GetMapping("/{id}/search-history/{searchHistoryId}/step/{step}")
    public ResponseEntity<?> downloadProfileImageFromS3(
        @PathVariable Long id,
        @PathVariable Long searchHistoryId,
        @PathVariable String step
    ) {
        Step stepValue = Step.valueOf(step.toUpperCase()); // Error
        String imagePath = String.format("missingPeopleId=%d/searchHistoryId=%d/step=%s/", id, searchHistoryId, stepValue.toString());
        return ResponseEntity.ok().body(new SuccessResponse(missingPeopleService.downloadImagesFromS3(imagePath, id, searchHistoryId)));
    }

    //ai 탐색코드 테스트
    @PostMapping("/test")
    public ResponseEntity<?> test(@RequestBody DetectionRequestDto detectionRequestDto) {
        return ResponseEntity.ok().body(new SuccessResponse(detectService.callDetectAPI(detectionRequestDto)));
    }
}