package com.capstone.server.controller;

import com.capstone.server.dto.FirstDetectionRequestDto;
import com.capstone.server.response.SuccessResponse;
import com.capstone.server.service.DetectService;
import com.capstone.server.service.SmsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/test")
public class TestController {
    @Autowired
    private SmsService smsService;
    @Autowired
    private DetectService detectService;

    //ai 탐색코드 테스트
    @PostMapping("/aiserver")
    public ResponseEntity<?> test(@RequestBody FirstDetectionRequestDto firstDetectionRequestDto) {
        return ResponseEntity.ok().body(new SuccessResponse(detectService.callFirstDetectAPI(firstDetectionRequestDto)));
    }

    @GetMapping("/url")
    public ResponseEntity<?> urlTest() {
        return ResponseEntity.ok().body(new SuccessResponse<>(smsService.getShortUrl(3L)));
    }

}
