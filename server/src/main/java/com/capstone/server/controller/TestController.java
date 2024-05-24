package com.capstone.server.controller;

import com.capstone.server.dto.SearchRequestDto;
import com.capstone.server.dto.detection.FirstDetectionRequestDto;
import com.capstone.server.dto.guardian.BetweenRequestDto;
import com.capstone.server.model.enums.Step;
import com.capstone.server.response.SuccessResponse;
import com.capstone.server.service.DetectService;
import com.capstone.server.service.SearchHistoryService;
import com.capstone.server.service.SmsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/test")
public class TestController {
    @Autowired
    private SmsService smsService;
    @Autowired
    private DetectService detectService;
    @Autowired
    private SearchHistoryService searchHistoryService;

    //ai 탐색코드 테스트
    @PostMapping("/aiserver")
    public ResponseEntity<?> test(@RequestBody FirstDetectionRequestDto firstDetectionRequestDto) {
        return ResponseEntity.ok().body(new SuccessResponse(detectService.callFirstDetectAPI(firstDetectionRequestDto.getMissingPeopleId())));
    }

    @GetMapping("/url")
    public ResponseEntity<?> urlTest(@RequestParam("id") Long id) {
        return ResponseEntity.ok().body(new SuccessResponse<>(smsService.getShortUrl(id)));
    }

    @GetMapping("/second")
    public ResponseEntity<?> secondTest() {
        List<Long> list = new ArrayList<>();
        list.add(266L);
        list.add(274L);
        BetweenRequestDto betweenRequestDto = new BetweenRequestDto();
        betweenRequestDto.setResultIds(list);
        SearchRequestDto searchRequestDto = new SearchRequestDto(
                LocalDateTime.parse("2021-09-06T01:01:01")
                , LocalDateTime.parse("2021-09-06T01:01:01"),
                37.6100, 126.9967, "도로명 주소"); //todo : 기능추가;
        //2차탐색기록 생성
        Step step = Step.fromValue("second");
        Long searchId = searchHistoryService.createSearchHistory(searchRequestDto, 89L, step);
        //2차탐색 시작
        detectService.postSecondDetectionResult(detectService.callSecondDetectApi(89L, betweenRequestDto, searchId));
        return ResponseEntity.ok().body(new SuccessResponse<>());
    }

}
