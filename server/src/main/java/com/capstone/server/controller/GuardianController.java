package com.capstone.server.controller;

import com.capstone.server.dto.KafkaDto;
import com.capstone.server.dto.SearchRequestDto;
import com.capstone.server.dto.detection.DetectionResultDto;
import com.capstone.server.dto.guardian.BetweenRequestDto;
import com.capstone.server.model.enums.SearchResultSortBy;
import com.capstone.server.model.enums.Step;
import com.capstone.server.response.SuccessResponse;
import com.capstone.server.service.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;


@Slf4j
@RestController
@RequestMapping("/api/guardian")
public class GuardianController {
    @Autowired
    private GuardianService guardianService;
    @Autowired
    private SearchResultService searchResultService;
    @Autowired
    private EncryptionService encryptionService;
    @Autowired
    private MissingPeopleService missingPeopleService;
    @Autowired
    private DetectService detectService;
    @Autowired
    private SearchHistoryService searchHistoryService;
    @Autowired
    private KafkaProducerService kafkaProducerService;

    @Value("${mobile.server.url}")
    private String REDIRECT_URL;


    //실종자 정보 받기
    @GetMapping("")
    public ResponseEntity<?> getMissingPeople(@RequestHeader("Authorization") String authorization) {
        Long id = encryptionService.extractIdFromToken(authorization);
        return ResponseEntity.ok().body(new SuccessResponse(guardianService.getMissingPeople(id)));
    }

    //현재 단계 받기
    @GetMapping("/step")
    public ResponseEntity<?> getStep(@RequestHeader("Authorization") String authorization) {
        Long id = encryptionService.extractIdFromToken(authorization);
        return ResponseEntity.ok().body(new SuccessResponse(missingPeopleService.getStep(id, false)));
    }

    //1차 탐색결과 가져오기
    @GetMapping("/between")
    public ResponseEntity<?> getFirstStepResult(
            @RequestHeader("Authorization") String authorization,
            @RequestParam(required = false, defaultValue = "similarity", value = "criteria") String criteria,
            @RequestParam(required = false, defaultValue = "1", value = "page") int page,
            @RequestParam(required = false, defaultValue = "50", value = "size") int pageSize) {
        SearchResultSortBy sortBy = SearchResultSortBy.fromValue(criteria);
        Step searchStep = Step.fromValue("first");
        Long id = encryptionService.extractIdFromToken(authorization);
        return ResponseEntity.ok().body(new SuccessResponse(searchResultService.getSearchResultByStep(id, searchStep, page - 1, pageSize, sortBy, DetectionResultDto.class).getList()));
    }

    //보호자화면 고른 사진 보내기
    @PostMapping("/between")
    public ResponseEntity<?> uploadBetweenResult(
            @RequestHeader("Authorization") String authorization,
            @RequestBody BetweenRequestDto betweenRequestDto) {
        Long id = encryptionService.extractIdFromToken(authorization);
//        between 단계가 아니면 요청을 보낼 수 없음. 현재 테스트를 위해 빼놓은 상태
//        Step step = guardianService.getStep(id).getStep();
//        if (step.equals(Step.fromValue("between"))) {
//            throw new CustomException(ErrorCode.BAD_REQUEST, "invalid step", "can't request step");
//        }
        //상화작용 단계 결과 db저장
        guardianService.postBetween(id, betweenRequestDto);

        SearchRequestDto searchRequestDto = searchHistoryService.createSearchRequestDto(betweenRequestDto);
        //2차탐색기록 생성
        Step step = Step.fromValue("second");
        Long searchId = searchHistoryService.createSearchHistory(searchRequestDto, id, step);
        
        //2차탐색 시작
        KafkaDto kafkaDto = KafkaDto.toKafkaDto(id, betweenRequestDto, searchId);
        kafkaProducerService.startCallSecondDetectApiToKafka(kafkaDto);

        //사진을 업로드하면 바로 2차탐색하게 구현하기
        return ResponseEntity.ok().body(new SuccessResponse("success"));
    }

    //상호작용 단계에서 고른 사진 보기
    @GetMapping("/between-result")
    public ResponseEntity<?> getBetweenResult(
            @RequestHeader("Authorization") String authorization,
            @RequestParam(required = false, defaultValue = "similarity", value = "criteria") String criteria,
            @RequestParam(required = false, defaultValue = "1", value = "page") int page,
            @RequestParam(required = false, defaultValue = "50", value = "size") int pageSize) {
        SearchResultSortBy sortBy = SearchResultSortBy.fromValue(criteria);
        Long id = encryptionService.extractIdFromToken(authorization);
        return ResponseEntity.ok().body(new SuccessResponse(searchResultService.getBetweenResult(id, page - 1, pageSize, DetectionResultDto.class).getList()));
    }

    //2차탐색 결과 가져오기
    @GetMapping("/second")
    public ResponseEntity<?> getSecondResult(
            @RequestHeader("Authorization") String authorization,
            @RequestParam(required = false, defaultValue = "similarity", value = "criteria") String criteria,
            @RequestParam(required = false, defaultValue = "1", value = "page") int page,
            @RequestParam(required = false, defaultValue = "50", value = "size") int pageSize) {
        Long id = encryptionService.extractIdFromToken(authorization);
        SearchResultSortBy sortBy = SearchResultSortBy.fromValue(criteria);
        Step searchStep = Step.fromValue("second");
        return ResponseEntity.ok().body(new SuccessResponse(searchResultService.getSearchResultByStep(id, searchStep, page - 1, pageSize, sortBy, DetectionResultDto.class).getList()));
    }

    //문자 전송 시 Redirect를 하여 쿠키를 받게하는 Controller
    @GetMapping("/validate-token")
    public ResponseEntity<?> validateToken(HttpServletResponse response, @RequestParam("token") String
            encryptedToken) throws URISyntaxException {
        try {
            //토큰 유효성 검사
            encryptionService.decryptToken(encryptedToken);
            Cookie cookie = new Cookie("authToken", encryptedToken);
            cookie.setPath("/");
            response.addCookie(cookie);
        } catch (Exception e) {
            // 복호화 실패 시 예외 처리
            System.err.println("토큰 복호화에 실패했습니다.");
            // 에러 페이지로 리다이렉트
            return ResponseEntity.ok().body(new SuccessResponse("검증실패"));
        }
        URI redirectUri = new URI(REDIRECT_URL);
//        URI redirectUri = new URI("http//localhost:8080");
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(redirectUri);
        return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
    }

}
