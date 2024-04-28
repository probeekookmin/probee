package com.capstone.server.service;

import com.capstone.server.code.ErrorCode;
import com.capstone.server.dto.DetectionRequestDto;
import com.capstone.server.dto.DetectionResponseDto;
import com.capstone.server.dto.DetectionResultDto;
import com.capstone.server.exception.CustomException;
import com.capstone.server.model.MissingPeopleEntity;
import com.capstone.server.repository.MissingPeopleRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.NoSuchElementException;

@Service
public class DetectService {

    private final RestTemplate restTemplate;
    private final MissingPeopleRepository missingPeopleRepository;
    @Value("${aiServer.url}")
    private String url;

    //test용 service
    public DetectService(RestTemplateBuilder builder, MissingPeopleRepository missingPeopleRepository) {
        this.restTemplate = builder.build();
        this.missingPeopleRepository = missingPeopleRepository;
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
    //실 사용 service, missingpeopleId만 받으면 탐색가능
    //todo : cctv 선정 알고리즘 반영
    public DetectionResponseDto callDetectAPI(Long id) {
        try{
            MissingPeopleEntity missingPeopleEntity = missingPeopleRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + id));
            DetectionRequestDto detectionRequestDto = DetectionRequestDto.fromEntity(missingPeopleEntity);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            //HttpEntity 생성
            HttpEntity<DetectionRequestDto> request = new HttpEntity<>(detectionRequestDto, headers);
            //요청 및 응답반환
            return restTemplate.postForObject(url, request, DetectionResponseDto.class);
        }catch (NoSuchElementException e){
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }
}
