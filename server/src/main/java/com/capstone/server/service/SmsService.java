package com.capstone.server.service;

import com.capstone.server.dto.SmsRequestDto;
import com.capstone.server.dto.SmsResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SmsService {
    @Value("${smsApi.key}")
    private String apiKey;
    private static final String url = "https://apick.app/rest/send_sms";
    @Autowired
    private RestTemplate restTemplate;

    public SmsResponseDto sendMessage(SmsRequestDto smsRequestDto) {
        //헤더 설정
        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("CL_AUTH_KEY", apiKey);

        //HttpEntity 생성
        HttpEntity<SmsRequestDto> request = new HttpEntity<>(smsRequestDto, headers);
        System.out.println(request);
        //요청 및 응답반환
        return restTemplate.postForObject(url, request, SmsResponseDto.class);
    }

}
