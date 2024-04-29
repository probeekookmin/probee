package com.capstone.server.service;

import com.capstone.server.code.ErrorCode;
import com.capstone.server.dto.DetectionRequestDto;
import com.capstone.server.dto.DetectionResponseDto;
import com.capstone.server.dto.DetectionResultDto;
import com.capstone.server.exception.CustomException;
import com.capstone.server.model.CCTVEntity;
import com.capstone.server.model.MissingPeopleEntity;
import com.capstone.server.model.SearchHistoryEntity;
import com.capstone.server.model.SearchResultEntity;
import com.capstone.server.model.enums.Step;
import com.capstone.server.repository.CCTVRepository;
import com.capstone.server.repository.MissingPeopleRepository;
import com.capstone.server.repository.SearchHistoryRepository;
import com.capstone.server.repository.SearchResultRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private  RestTemplate restTemplate;
    @Autowired
    private  MissingPeopleRepository missingPeopleRepository;
    @Autowired
    private  SearchHistoryRepository searchHistoryRepository;
    @Autowired
    private  CCTVRepository cctvRepository;
    @Autowired
    private SearchResultRepository searchResultRepository;

    @Value("${aiServer.url}")
    private String url;


    //test용 service
    public DetectionResponseDto callDetectAPI(DetectionRequestDto detectionRequestDto) {
        //헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        //HttpEntity 생성
        HttpEntity<DetectionRequestDto> request = new HttpEntity<>(detectionRequestDto, headers);
        //요청 및 응답반환
        return restTemplate.postForObject(url, request, DetectionResponseDto.class);
    }

    //실 사용 service, missingpeopleId를 받아와 착장정보를 가져와 서버로 요청을 보냄.
    //todo : cctv 선정 알고리즘 반영, 이미 착장정보가 있는 경우, 쿼리생성과정 생략
    public DetectionResponseDto callDetectAPI(Long id, Step step) {
        try{
            MissingPeopleEntity missingPeople = missingPeopleRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + id));
            DetectionRequestDto detectionRequestDto = DetectionRequestDto.fromEntity(missingPeople);
            detectionRequestDto.setStep(step);
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

    @Transactional
    public void postDetectionResult(DetectionResultDto detectionResultDto) {
        try{
            //실종자 정보에 한국어 쿼리 업데이트
            MissingPeopleEntity missingPeople =  missingPeopleRepository.findById(detectionResultDto.getMissingPeopleId()).orElse(null);
            if(missingPeople != null && missingPeople.getQuery()==null){
                missingPeople.setKoQuery(detectionResultDto.getKoQuery());
                missingPeople.setQuery(detectionResultDto.getQuery());
                missingPeopleRepository.save(missingPeople);
            }

            //searchHistory와 연결
            SearchHistoryEntity searchHistory = searchHistoryRepository.getReferenceById(detectionResultDto.getSearchId());

            //imgaepath한줄씩 database에 업로드
            for(DetectionResultDto.ImageData imageData : detectionResultDto.getData()){
                SearchResultEntity searchResult =  detectionResultDto.toSearchResultEntity();
                searchResult.setSearchHistoryEntity(searchHistory);

                CCTVEntity cctvEntity = cctvRepository.getReferenceById(imageData.getCctvId());
                searchResult.setCctvEntity(cctvEntity);
                searchResult.setImageUrl(imageData.getImg_path());
                searchResultRepository.save(searchResult);
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }
}
