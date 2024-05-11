package com.capstone.server.controller;

import com.capstone.server.dto.guardian.BetweenRequestDto;
import com.capstone.server.dto.guardian.DetectionResultDto;
import com.capstone.server.model.enums.SearchResultSortBy;
import com.capstone.server.model.enums.Step;
import com.capstone.server.response.SuccessResponse;
import com.capstone.server.service.EncryptionService;
import com.capstone.server.service.GuardianService;
import com.capstone.server.service.MissingPeopleService;
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
    private MissingPeopleService missingPeopleService;
    @Autowired
    private EncryptionService encryptionService;

    @Value("${mobile.server.url}")
    private String REDIRECT_URL;


    @GetMapping("")
    public ResponseEntity<?> getMissingPeople(@RequestHeader("Authorization") String authorization) {
        System.out.println(authorization);
        Long id = encryptionService.extractIdFromToken(authorization);
        return ResponseEntity.ok().body(new SuccessResponse(guardianService.getMissingPeople(id)));
    }

    @GetMapping("/step")
    public ResponseEntity<?> getStep(@RequestHeader("Authorization") String authorization) {
        Long id = encryptionService.extractIdFromToken(authorization);
        return ResponseEntity.ok().body(new SuccessResponse(guardianService.getStep(id)));
    }

    @GetMapping("/between")
    public ResponseEntity<?> getFirstStepResult(
            @RequestHeader("Authorization") String authorization,
            @RequestParam(required = false, defaultValue = "similarity", value = "criteria") String criteria,
            @RequestParam(required = false, defaultValue = "1", value = "page") int page,
            @RequestParam(required = false, defaultValue = "50", value = "size") int pageSize) {
        SearchResultSortBy sortBy = SearchResultSortBy.fromValue(criteria);
        Step searchStep = Step.fromValue("first");
        Long id = encryptionService.extractIdFromToken(authorization);
        return ResponseEntity.ok().body(new SuccessResponse(missingPeopleService.getSearchResultByStep(id, searchStep, page - 1, pageSize, sortBy, DetectionResultDto.class).getList()));
    }

    @GetMapping("/between-result")
    public ResponseEntity<?> getBetweenResult(
            @RequestHeader("Authorization") String authorization,
            @RequestParam(required = false, defaultValue = "similarity", value = "criteria") String criteria,
            @RequestParam(required = false, defaultValue = "1", value = "page") int page,
            @RequestParam(required = false, defaultValue = "50", value = "size") int pageSize) {
        SearchResultSortBy sortBy = SearchResultSortBy.fromValue(criteria);
        Long id = encryptionService.extractIdFromToken(authorization);
        return ResponseEntity.ok().body(new SuccessResponse(missingPeopleService.getBetweenResult(id, page - 1, pageSize, DetectionResultDto.class).getList()));
    }


    @PostMapping("/between")
    public ResponseEntity<?> uploadBetweenResult(@RequestHeader("Authorization") String authorization, @RequestBody BetweenRequestDto betweenRequestDto) {
        Long id = encryptionService.extractIdFromToken(authorization);
//        between 단계가 아니면 요청을 보낼 수 없음. 현재 테스트를 위해 빼놓은 상태
//        Step step = guardianService.getStep(id).getStep();
//        if (step.equals(Step.fromValue("between"))) {
//            throw new CustomException(ErrorCode.BAD_REQUEST, "invalid step", "can't request step");
//        }
        return ResponseEntity.ok().body(new SuccessResponse(guardianService.postBetween(id, betweenRequestDto)));
    }

    //문자 전송 시 Redirect를 하여 쿠키를 받게하는 Controller
    @GetMapping("/validate-token")
    public ResponseEntity<?> validateToken(HttpServletResponse response, @RequestParam("token") String encryptedToken) throws URISyntaxException {
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
