package com.capstone.server.controller;

import com.capstone.server.code.ErrorCode;
import com.capstone.server.dto.*;
import com.capstone.server.dto.detection.DetectionResultDetailDto;
import com.capstone.server.exception.CustomException;
import com.capstone.server.model.enums.MissingPeopleSortBy;
import com.capstone.server.model.enums.SearchResultSortBy;
import com.capstone.server.model.enums.Status;
import com.capstone.server.model.enums.Step;
import com.capstone.server.response.SuccessResponse;
import com.capstone.server.service.*;
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
    private SmsService smsService;
    @Autowired
    private EncryptionService encryptionService;
    @Autowired
    private KafkaProducerService kafkaProducerService;
    @Autowired
    private SearchResultService searchResultService;
    @Autowired
    private SearchHistoryService searchHistoryService;
    @Autowired
    private ChatGPTService chatGPTService;
    @Autowired
    private BetweenService betweenService;

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
        Status statusValue;
        MissingPeopleSortBy sortBy = MissingPeopleSortBy.fromValue(criteria);
        if (name != null && status != null) {
            statusValue = Status.fromValue(status);
            missingPeopleListResponseDtos = missingPeopleService.getAllMissingPeopleByNameContainingAndStatus(page - 1, pageSize, sortBy, name, statusValue);
        } else if (name != null) {
            missingPeopleListResponseDtos = missingPeopleService.getAllMissingPeopleByNameContaining(page - 1, pageSize, sortBy, name);
        } else if (status != null) {
            statusValue = Status.fromValue(status);
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
            MissingPeopleCreateResponseDto createResponseDto = missingPeopleService.createMissingPeople(missingPeopleCreateRequestDto);
            // kafkaProducerService.startCallFirstDetectApiToKafka(createResponseDto.getId());
            //메시지 전송
            smsService.sendRegistrationMessage(missingPeopleCreateRequestDto.getPhoneNumber(), missingPeopleCreateRequestDto.getMissingPeopleName(), createResponseDto.getId());
            return ResponseEntity.ok().body(new SuccessResponse(createResponseDto));
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
            // ChatGPT query 생성, [ko_query, en_query]
            missingPeopleCreateRequestDto = chatGPTService.translateEnglishToKorean(missingPeopleCreateRequestDto);

            //DB에 실종자 정보 등록
            MissingPeopleCreateResponseDto createResponse = missingPeopleService.createMissingPeople(missingPeopleCreateRequestDto);

            //생성된 MissingpeopleId와 searchid로 탐색 todo : 이 함수를 kafka에 넣고 돌아오는 결과처리
            kafkaProducerService.startCallFirstDetectApiToKafka(createResponse.getId());

            //메시지 전송 (버그때문에 주석처리)
            smsService.sendRegistrationMessage(missingPeopleCreateRequestDto.getPhoneNumber(), missingPeopleCreateRequestDto.getMissingPeopleName(), createResponse.getId());
            return ResponseEntity.ok().body(createResponse);
        }
    }


    //실종자 프로필 사진 등록
    @PostMapping("/profile")
    public ResponseEntity<?> uploadProfileImageToS3(
            @RequestPart(value = "profile", required = false) MultipartFile image,
            @RequestHeader("Authorization") String authorization
    ) {
        if (image == null || image.isEmpty()) {
            // TODO : 에러 수정
            throw new CustomException(ErrorCode.BAD_REQUEST, "Empty Image Error", "please Upload Image ");
        }
        Long id = encryptionService.extractIdFromToken(authorization);
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
        return ResponseEntity.ok(new SuccessResponse(searchHistoryService.getSearchHistoryList(id)));
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

    //탐색결과 가져오기
    @GetMapping("/{id}/search-result")
    public ResponseEntity<?> getSearchResult(
            @PathVariable Long id,
            @RequestParam(required = false, value = "step") String step,
            @RequestParam(required = false, defaultValue = "0", value = "search-id") long searchId,
            @RequestParam(required = false, defaultValue = "similarity", value = "criteria") String criteria,
            @RequestParam(required = false, defaultValue = "1", value = "page") int page,
            @RequestParam(required = false, defaultValue = "5", value = "size") int pageSize
    ) {
        SearchResultSortBy sortBy = SearchResultSortBy.fromValue(criteria);
        if (step == null && searchId == 0) {
            //todo 예외처리
            throw new CustomException(ErrorCode.DATA_INTEGRITY_VALIDATION_ERROR, "RequestParamError", "At least one of 'step' or 'searchId' must be provided.");
        }
        if (searchId != 0) {
            //searchId가 있으면 해당하는 검색기록 가져오기
            return ResponseEntity.ok().body(new SuccessResponse(searchResultService.getSearchResultBySearchId(id, searchId, page - 1, pageSize, sortBy)));
        }
        //step만 있으면 해당 step의 최신 결과만 가져오기
        Step searchStep = Step.fromValue(step);
        return ResponseEntity.ok().body(new SuccessResponse(searchResultService.getSearchResultByStep(id, searchStep, page - 1, pageSize, sortBy, DetectionResultDetailDto.class)));
    }

    //탐색결과 이미지 가져오기
    //만약 이미지페스만 s3에서 받아온다고 하면 쓸 부분이 있을듯.
    @GetMapping("/{id}/search-history/{searchHistoryId}/step/{step}")
    public ResponseEntity<?> downloadProfileImageFromS3(
            @PathVariable Long id,
            @PathVariable Long searchHistoryId,
            @PathVariable String step
    ) {
        Step stepValue = Step.fromValue(step); // Error
        String imagePath = String.format("missingPeopleId=%d/searchHistoryId=%d/step=%s/", id, searchHistoryId, stepValue.toString());
        return ResponseEntity.ok().body(new SuccessResponse(missingPeopleService.downloadImagesFromS3(imagePath, id, searchHistoryId)));
    }

    //탐색단계 돌리기
    @PatchMapping("/{id}/step")
    public ResponseEntity<?> changeStep(
            @RequestParam(required = false, value = "step") String step,
            @PathVariable Long id
    ) {
        Step stepValue = Step.fromValue(step);
        return ResponseEntity.ok().body(new SuccessResponse(missingPeopleService.changeStep(stepValue, id)));
    }

    //탐색 단계 가져오기
    @GetMapping("/{id}/step")
    public ResponseEntity<?> getStep(@PathVariable Long id) {
        return ResponseEntity.ok().body(new SuccessResponse(missingPeopleService.getStep(id, true)));

    }

    //상호작용단계 결과 가져오기
    @GetMapping("/{id}/between-result")
    public ResponseEntity<?> getBetweenHistory(
            @PathVariable Long id,
            @RequestParam(required = false, defaultValue = "similarity", value = "criteria") String criteria,
            @RequestParam(required = false, defaultValue = "1", value = "page") int page,
            @RequestParam(required = false, defaultValue = "5", value = "size") int pageSize
    ) {
        SearchResultSortBy sortBy = SearchResultSortBy.fromValue(criteria); //현재는 안씀
        return ResponseEntity.ok().body(new SuccessResponse(searchResultService.getBetweenResult(id, page - 1, pageSize, DetectionResultDetailDto.class)));
    }

    // 검색의 탐색반경 가져오기
    @GetMapping("/{id}/search-radius")
    public ResponseEntity<?> getSearchRadius(
            @PathVariable Long id,
            @RequestParam(required = false, value = "search-id") Long searchId
    ) {
        if (searchId != null) {//search-id가 있으면 searchid기준으로 결과를 보내줌
            return ResponseEntity.ok().body(new SuccessResponse(searchHistoryService.getSearchRangeById(searchId)));
        }
        return ResponseEntity.ok().body(new SuccessResponse(searchHistoryService.getSearchRangeById(id)));
    }

    //지능형 탐색 시작하기
    @PostMapping("/{id}/search")
    public ResponseEntity<?> startSearching(
            @PathVariable Long id,
            @Validated @RequestBody SearchRequestDto searchRequestDto
    ) {
        //Todo : 1차인지, 2차인지 고를 수 있어야 함
        //DB에 탐색 등록
        Step step = Step.fromValue("first");
        searchHistoryService.createSearchHistory(searchRequestDto, id, step);
        //생성된 MissingpeopleId와 searchid로 탐색 todo : 이 함수를 kafka에 넣고 돌아오는 결과처리
//        detectService.callFirstDetectAPI(id); //Kafka안돼서 테스트용
        // kafkaProducerService.startCallFirstDetectApiToKafka(id);
        return ResponseEntity.ok().body(new SuccessResponse());
    }

    @GetMapping("/{id}/mapposition")
    public ResponseEntity<?> getMapPosition(
            @PathVariable Long id,
            @RequestParam(required = false, value = "step") String s) {
        Step step = Step.fromValue(s);
        if (s.equals("between"))
            return ResponseEntity.ok().body(new SuccessResponse(betweenService.getSearchResultsByMissingPeopleId(id)));
        return ResponseEntity.ok().body(new SuccessResponse(searchResultService.getSearchResultByHistoryId(id, step)));
    }
}