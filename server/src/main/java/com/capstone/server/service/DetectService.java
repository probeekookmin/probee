package com.capstone.server.service;

import com.capstone.server.code.ErrorCode;
import com.capstone.server.dto.DetectionResponseDto;
import com.capstone.server.dto.DetectionResultDto;
import com.capstone.server.dto.FirstDetectionRequestDto;
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
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.NoSuchElementException;

@Service
public class DetectService {

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private MissingPeopleRepository missingPeopleRepository;
    @Autowired
    private SearchHistoryRepository searchHistoryRepository;
    @Autowired
    private CCTVRepository cctvRepository;
    @Autowired
    private SearchResultRepository searchResultRepository;
    @Autowired
    private CCTVService cctvService;

    @Value("${aiServer.url}")
    private String url;


    //test용 service
    public DetectionResponseDto callFirstDetectAPI(FirstDetectionRequestDto firstDetectionRequestDto) {
        //헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        //HttpEntity 생성
        HttpEntity<FirstDetectionRequestDto> request = new HttpEntity<>(firstDetectionRequestDto, headers);
        //요청 및 응답반환
        return restTemplate.postForObject(url, request, DetectionResponseDto.class);
    }

    //실 사용 service, missingpeopleId를 받아와 착장정보를 가져와 서버로 요청을 보냄.
    //수정 완료.
    public DetectionResultDto callFirstDetectAPI(Long id) throws CustomException {
        try {
            //과정1 : 실종자 id가 db에 있는지 확인합니다. (이건 수정해야될듯 (불필요한 db요청이 너무 많아지는거 같기도 함)
            MissingPeopleEntity missingPeopleEntity = missingPeopleRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + id));
            SearchHistoryEntity searchHistoryEntity = missingPeopleEntity.getSearchHistoryEntities().get(missingPeopleEntity.getSearchHistoryEntities().size() - 1);
            //과정2 : ai server요청에 쓸 dto를생성합니다
            FirstDetectionRequestDto firstDetectionRequestDto = FirstDetectionRequestDto.fromEntity(missingPeopleEntity, searchHistoryEntity);
            firstDetectionRequestDto.setCctvId(cctvService.findCCTVsNearbyLocationWithinDistance(searchHistoryEntity.getLongitude(), searchHistoryEntity.getLatitude()));
            firstDetectionRequestDto.setQuery("a man weraing a black skirt and blue coat"); // 테스트용 임시 쿼리
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            //HttpEntity 생성
            HttpEntity<FirstDetectionRequestDto> request = new HttpEntity<>(firstDetectionRequestDto, headers);
            // 요청 및 응답 반환
            return restTemplate.postForObject(url, request, DetectionResultDto.class);
        } catch (HttpServerErrorException | HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.UNPROCESSABLE_ENTITY) {
                throw new CustomException(ErrorCode.INVALID_REQUEST_DATA);
            } else {
                // 그 외의 서버 오류에 대한 처리
                throw new CustomException(ErrorCode.AI_SERVER_ERROR, e);
            }
        } catch (NoSuchElementException e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, e);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.CONNECTION_ERROR, "aiServer", "close");
        }
    }

    @Transactional
    public void postFirstDetectionResult(DetectionResultDto detectionResultDto) throws CustomException {
        try {
            //실종자 정보에 한국어 쿼리 업데이트
            //과정 1 : missing people id 있나 검사
            Long missingPeopleId = detectionResultDto.getMissingPeopleId();
            MissingPeopleEntity missingPeople = missingPeopleRepository.findById(missingPeopleId)
                    .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + missingPeopleId));
            //과정 2 : 해당 실종자의 탐색단계 수정
            missingPeople.setStep(Step.valueOf("BETWEEN"));
            missingPeopleRepository.save(missingPeople);

            //과정 3 : 응답으로오는 searchId를 통해 search result 업데이트
            //searchHistory와 연결
            SearchHistoryEntity searchHistory = searchHistoryRepository.getReferenceById(detectionResultDto.getSearchId());
            //과정 4 : imgaepath한줄씩 database에 업로드
            for (DetectionResultDto.ImageData imageData : detectionResultDto.getData()) {
                SearchResultEntity searchResult = imageData.toSearchResultEntity();
                searchResult.setSearchHistoryEntity(searchHistory);
                CCTVEntity cctvEntity = cctvRepository.getReferenceById(imageData.getCctvId());
                searchResult.setCctvEntity(cctvEntity);
                searchResultRepository.save(searchResult);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }
}
