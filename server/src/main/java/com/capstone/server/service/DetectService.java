package com.capstone.server.service;

import com.capstone.server.dto.DetectionRequestDto;
import com.capstone.server.dto.DetectionResponseDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class DetectService {

    private final RestTemplate restTemplate;
    @Value("${aiServer.url}")
    private String url;

    public DetectService(RestTemplateBuilder builder) {
        this.restTemplate = builder.build();
    }

    public DetectionResponseDto callDetectAPI(DetectionRequestDto detectionRequestDto) {
        //헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        //HttpEntity 생성
        HttpEntity<DetectionRequestDto> request = new HttpEntity<>(detectionRequestDto, headers);
        //요청 및 응답반환
        return restTemplate.postForObject(url, request, DetectionResponseDto.class);
    }

}
