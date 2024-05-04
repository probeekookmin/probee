package com.capstone.server.controller;

import com.capstone.server.code.ErrorCode;
import com.capstone.server.dto.*;
import com.capstone.server.exception.CustomException;
import com.capstone.server.model.enums.MissingPeopleSortBy;
import com.capstone.server.model.enums.SearchResultSortBy;
import com.capstone.server.model.enums.Status;
import com.capstone.server.model.enums.Step;
import com.capstone.server.response.SuccessResponse;
import com.capstone.server.service.DetectService;
import com.capstone.server.service.MissingPeopleService;
import com.capstone.server.service.S3Service;
import com.capstone.server.service.SmsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("/api/missing-people")
public class MissingPeopleController {

    @Value("${cloud.aws.s3.bucketName}")
    private String bucketName;
    @Value("${cloud.aws.region.static}")
    private String region;
    @Autowired
    private MissingPeopleService missingPeopleService;
    @Autowired
    private S3Service s3Service;
    @Autowired
    private DetectService detectService;
    @Autowired
    private SmsService smsService;

    @GetMapping("")
    public ResponseEntity<?> getMissingPeopleList(
            // TODO : page 시작을 1로 맞추기 위해 -1 했음. 수정 필요
            @RequestParam(required = false, defaultValue = "1", value = "page") int page,
            @RequestParam(required = false, defaultValue = "50", value = "size") int pageSize,
            @RequestParam(required = false, defaultValue = "createdAt", value = "criteria") String criteria,
            @RequestParam(required = false, value = "name") String name,
            @RequestParam(required = false, value = "status") String status
    ) {
        List<MissingPeopleListResponseDto> missingPeopleListResponseDtos;

        MissingPeopleSortBy sortBy = MissingPeopleSortBy.fromValue(criteria);
        Status statusValue = Status.fromValue(status);
        if (name != null && status != null) {
            missingPeopleListResponseDtos = missingPeopleService.getAllMissingPeopleByNameContainingAndStatus(page - 1, pageSize, sortBy, name, statusValue);
        } else if (name != null) {
            missingPeopleListResponseDtos = missingPeopleService.getAllMissingPeopleByNameContaining(page - 1, pageSize, sortBy, name);
        } else if (status != null) {
            missingPeopleListResponseDtos = missingPeopleService.getAllMissingPeopleByStatus(page - 1, pageSize, sortBy, statusValue);
        } else {
            missingPeopleListResponseDtos = missingPeopleService.getAllMissingPeople(page - 1, pageSize, sortBy);
        }
        return ResponseEntity.ok().body(new SuccessResponse(missingPeopleListResponseDtos));
    }

    // MissingPeople 디테일정보 가져오기 (실종자 리포트화면에 쓸거)
    @GetMapping("/{id}")
    public ResponseEntity<?> getMissingPeopleById(@PathVariable Long id) {
        MissingPeopleDetailResponseDto missingPeopleDetailResponseDto = missingPeopleService.getMissingPeopleById(id);
        return ResponseEntity.ok().body(new SuccessResponse(missingPeopleDetailResponseDto));
    }

    // TODO : AI 모델 탐색 코드 추가
    //실종자 등록
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
            MissingPeopleCreateResponseDto createResponse = missingPeopleService.createMissingPeople(missingPeopleCreateRequestDto);
            //생성된 MissingpeopleId와 searchid로 탐색 todo : 서버 코드에따라서 error처리 해야함
            detectService.callDetectAPI(createResponse.getId(), Step.valueOf("FIRST"));
            //메시지 전송
            smsService.sendRegistrationMessage(missingPeopleCreateRequestDto.getPhoneNumber(), missingPeopleCreateRequestDto.getMissingPeopleName());
            return ResponseEntity.ok().body(createResponse);
        }
    }

    //서버에 연산결과 등록
    @PostMapping("/detect")
    public ResponseEntity<?> uploadDetectResult(@Validated @RequestBody DetectionResultDto detectionResultDto) {
        detectService.postDetectionResult(detectionResultDto);
        return ResponseEntity.ok().body(new SuccessResponse("등록성공"));
    }

    //실종자 프로필 사진 등록
    @PostMapping("/{id}/profile")
    public ResponseEntity<?> uploadProfileImageToS3(
            @RequestPart(value = "profile", required = false) MultipartFile image,
            @PathVariable Long id
    ) {
        if (image == null || image.isEmpty()) {
            // TODO : 에러 수정
            throw new CustomException(ErrorCode.BAD_REQUEST);
        }
        String imageName = String.format("missingPeopleId=%d/profile/001", id);
        //s3에 이미지 업로드
        S3UploadResponseDto s3UploadResponseDto = missingPeopleService.uploadImageToS3(image, imageName, id);

        String s3ProfileUrl = "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + imageName; 
        String originalFilename = image.getOriginalFilename(); //원본 파일 명
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));

        s3UploadResponseDto.setUrl(s3ProfileUrl + extension);
        missingPeopleService.setProfileImagePath(id, s3ProfileUrl + extension);
        return ResponseEntity.ok().body(new SuccessResponse(s3UploadResponseDto));
    }

    //실종자 프로필 사진 가져오기
    @GetMapping("/{id}/profile")
    public ResponseEntity<?> getProfilePresignedUrl(@PathVariable Long id) {
        String imagePath = String.format("missingPeopleId=%d/profile", id);
        return ResponseEntity.ok(new SuccessResponse(missingPeopleService.downloadImageFromS3(imagePath, id)));
    }

    //검색기록 가져오기
    @GetMapping("/{id}/search-history")
    public ResponseEntity<?> getSearchHistoryList(@PathVariable Long id) {
        return ResponseEntity.ok(new SuccessResponse(missingPeopleService.getSearchHistoryList(id)));
    }

    //탐색결과 이미지 등록하기 (안쓸듯)
    @PostMapping("/{id}/search-history/{searchHistoryId}/step/{step}")
    public ResponseEntity<?> uploadProfileImageToS3(
            @RequestPart(value = "result", required = false) List<MultipartFile> images,
            @PathVariable Long id,
            @PathVariable Long searchHistoryId,
            @PathVariable String step
    ) {
        if (images == null || images.isEmpty() || Objects.isNull(images.get(0))) {
            // TODO : 에러 수정
            throw new CustomException(ErrorCode.USER_EXISTS);
        }

        Step stepValue = Step.valueOf(step.toUpperCase());
        String imagePath = String.format("missingPeopleId=%d/searchHistoryId=%d/step=%s/", id, searchHistoryId, stepValue.toString());
        return ResponseEntity.ok().body(new SuccessResponse(missingPeopleService.uploadImagesToS3(images, imagePath, id, searchHistoryId)));
    }

    @GetMapping("/{id}/search-result")
    public ResponseEntity<?> getSearchResult(
            @PathVariable Long id,
            @RequestParam(required = false, value = "step") String step,
            @RequestParam(required = false, defaultValue = "0", value = "search-id") long searchId,
            @RequestParam(required = false, defaultValue = "similarity", value = "criteria") String criteria,
            @RequestParam(required = false, defaultValue = "1", value = "page") int page,
            @RequestParam(required = false, defaultValue = "5", value = "size") int pageSize
    ) {
        List<SearchResultDto> searchResultDtos = null;
        SearchResultSortBy sortBy = SearchResultSortBy.fromValue(criteria);
        if (step == null && searchId == 0) {
            //todo 예외처리
            throw new CustomException(ErrorCode.DATA_INTEGRITY_VALIDATION_ERROR, "RequestParamError", "At least one of 'step' or 'searchId' must be provided.");
        } else if (step != null && searchId != 0) {
            throw new CustomException(ErrorCode.DATA_INTEGRITY_VALIDATION_ERROR, "RequestParamError", "Can't provide both parameter.");
        }
        if (step != null) {
            //해당 step의 가장 최신 검색결과 가져오기
            Step searchStep = Step.fromValue(step);
            searchResultDtos = missingPeopleService.getSearchResultByStep(id, searchStep, page - 1, pageSize, sortBy);
        }
        if (searchId != 0) {
            //searchId에 해당하는 검색기록 가져오기
            searchResultDtos = missingPeopleService.getSearchResultBySearchId(id, searchId, page - 1, pageSize, sortBy);
        }
        return ResponseEntity.ok().body(new SuccessResponse(searchResultDtos));
    }

    //탐색결과 이미지 가져오기
    //만약 이미지페스만 s3에서 받아온다고 하면 쓸 부분이 있을듯.
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

    //탐색단계 돌리기
    @PatchMapping("/{id}/step")
    public ResponseEntity<?> changeStep(@Validated @RequestBody StepDto stepDto, @PathVariable Long id) {
        stepDto.setMissingPeopleId(id);
        return ResponseEntity.ok().body(new SuccessResponse(missingPeopleService.changeStatus(stepDto)));
    }

    //탐색 단계 가져오기
    @GetMapping("/{id}/step")
    public ResponseEntity<?> getStep(@PathVariable Long id) {
        return ResponseEntity.ok().body(new SuccessResponse(missingPeopleService.getStatus(id)));

    }

    //ai 탐색코드 테스트
    @PostMapping("/test")
    public ResponseEntity<?> test(@RequestBody DetectionRequestDto detectionRequestDto) {
        return ResponseEntity.ok().body(new SuccessResponse(detectService.callDetectAPI(detectionRequestDto)));
    }


}