package com.capstone.server.controller;

import com.capstone.server.code.ErrorCode;
import com.capstone.server.dto.DetectionRequestDto;
import com.capstone.server.dto.MissingPeopleCreateRequestDto;
import com.capstone.server.dto.MissingPeopleResponseDto;
import com.capstone.server.exception.CustomException;
import com.capstone.server.response.SuccessResponse;
import com.capstone.server.service.DetectService;
import com.capstone.server.service.MissingPeopleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/missing-people")
public class MissingPeopleController {

    @Autowired
    private MissingPeopleService missingPeopleService;
    @Autowired
    private DetectService detectService;

    // MissingPeople 전체 가져오기
    @GetMapping()
    public ResponseEntity<?> getUsers() {
        List<MissingPeopleResponseDto> missingPeopleResponseDtos = missingPeopleService.getAllMissingPeople();
        return ResponseEntity.ok().body(new SuccessResponse(missingPeopleResponseDtos));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMissingPersonById(@PathVariable Long id) {
        MissingPeopleResponseDto missingPeopleResponseDto = missingPeopleService.getMissingPeopleById(id);
        return ResponseEntity.ok().body(new SuccessResponse(missingPeopleResponseDto));
    }

    // TODO : AI 모델 탐색 코드 추가
    @PostMapping()
    public ResponseEntity<?> createUser(@Validated @RequestBody MissingPeopleCreateRequestDto missingPeopleCreateRequestDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();

            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            System.out.println(errorMap);
            throw new CustomException(ErrorCode.BAD_REQUEST, errorMap);
        } else {
            return ResponseEntity.ok().body(new SuccessResponse(missingPeopleService.createMissingPeople(missingPeopleCreateRequestDto)));
        }
    }


    //ai 탐색코드 테스트
    @PostMapping("/test")
    public ResponseEntity<?> test(@RequestBody DetectionRequestDto detectionRequestDto) {
        System.out.println(detectionRequestDto);
        return ResponseEntity.ok().body(new SuccessResponse(detectService.callDetectAPI(detectionRequestDto)));
    }
}