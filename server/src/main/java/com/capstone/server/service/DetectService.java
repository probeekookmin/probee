package com.capstone.server.service;

import com.capstone.server.code.ErrorCode;
import com.capstone.server.dto.detection.FirstDetectionDataDto;
import com.capstone.server.dto.detection.FirstDetectionRequestDto;
import com.capstone.server.dto.detection.SecondDetectionDataDto;
import com.capstone.server.dto.detection.SecondDetectionRequestDto;
import com.capstone.server.dto.guardian.BetweenRequestDto;
import com.capstone.server.exception.CustomException;
import com.capstone.server.model.CCTVEntity;
import com.capstone.server.model.MissingPeopleEntity;
import com.capstone.server.model.SearchHistoryEntity;
import com.capstone.server.model.SearchResultEntity;
import com.capstone.server.model.enums.Step;
import com.capstone.server.repository.*;
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

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

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
    @Autowired
    private BetweenRepository betweenRepository;

    @Value("${aiServer.url}")
    private String url;

    //실 사용 service, missingpeopleId를 받아와 착장정보를 가져와 서버로 요청을 보냄.
    //수정 완료.
    public FirstDetectionDataDto callFirstDetectAPI(Long id) throws CustomException {
        try {

            //과정1 : 실종자 id가 db에 있는지 확인합니다. (이건 수정해야될듯 (불필요한 db요청이 너무 많아지는거 같기도 함) todo : 리팩토링. 현재 너무 과도하게 데이터를 불러오고있음.
            MissingPeopleEntity missingPeople = missingPeopleRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + id));
            //해당 Id의 가장 최신 탐색기록을 가져와 요청 보낼 dto생성
            SearchHistoryEntity searchHistoryEntity = searchHistoryRepository.findFirstByMissingPeopleEntityIdAndStepOrderByCreatedAtAsc(id, Step.fromValue("first"));
            //과정2 : ai server요청에 쓸 dto를생성합니다
            FirstDetectionRequestDto firstDetectionRequestDto = FirstDetectionRequestDto.fromEntity(missingPeople, searchHistoryEntity);
            firstDetectionRequestDto.setCctvId(cctvService.findCCTVsNearbyLocationWithinDistance(searchHistoryEntity.getLongitude(), searchHistoryEntity.getLatitude()));
            firstDetectionRequestDto.setQuery("a man weraing a black skirt and blue coat"); // 테스트용 임시 쿼리
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            //HttpEntity 생성
            HttpEntity<FirstDetectionRequestDto> request = new HttpEntity<>(firstDetectionRequestDto, headers);
            // 요청 및 응답 반환
            return restTemplate.postForObject(url + "/run", request, FirstDetectionDataDto.class);
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
    public void postFirstDetectionResult(FirstDetectionDataDto firstDetectionDataDto) throws CustomException {
        try {
            //과정 1 : missing people id 있나 검사
            Long missingPeopleId = firstDetectionDataDto.getMissingPeopleId();

            MissingPeopleEntity missingPeople = missingPeopleRepository.findById(missingPeopleId)
                    .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + missingPeopleId));
            //과정 2 : 해당 실종자의 탐색단계 수정 => 따로 함수 빼야됨
            missingPeople.setStep(Step.valueOf("BETWEEN"));
            missingPeopleRepository.save(missingPeople);

            //과정 3 : 응답으로오는 searchId를 통해 search result 업데이트
            //searchHistory와 연결
            SearchHistoryEntity searchHistory = searchHistoryRepository.getReferenceById(firstDetectionDataDto.getSearchId());
            //과정 4 : imgaepath한줄씩 database에 업로드
            for (FirstDetectionDataDto.ImageData imageData : firstDetectionDataDto.getData()) {
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

    public FirstDetectionDataDto callSecondDetectApi(Long id, BetweenRequestDto betweenRequestDto, Long searchId) {
        try {
            //과정1 : ai server요청에 쓸 dto를 생성
            SecondDetectionRequestDto secondDetectionRequestDto = new SecondDetectionRequestDto();
            secondDetectionRequestDto.setTopK(20);
            //과정 2 고른 사진 가져와서 넣어주기
            List<SearchResultEntity> betweenEntityList = searchResultRepository.findByIdIn(betweenRequestDto.getResultIds());
            secondDetectionRequestDto.setQueryImagePath(betweenEntityList.stream()
                    .map(SearchResultEntity::getImageUrl)
                    .collect(Collectors.toList()));
            //과정 3 기존 yolo돌린 search id가져오기
            secondDetectionRequestDto.setFirstSearchId(betweenEntityList.get(0).getSearchHistoryEntity().getId());
            secondDetectionRequestDto.setSecondSearchId(searchId);
            secondDetectionRequestDto.setMissingPeopleId(id);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            //HttpEntity 생성
            HttpEntity<SecondDetectionRequestDto> request = new HttpEntity<>(secondDetectionRequestDto, headers);
            // 요청 및 응답 반환
            return restTemplate.postForObject(url + "/second", request, FirstDetectionDataDto.class);

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

    //todo : 리팩토링
    @Transactional
    public void postSecondDetectionResult(FirstDetectionDataDto firstDetectionDataDto) throws CustomException {
        try {

            //과정 3 : 응답으로오는 searchId를 통해 search result 업데이트
            //searchHistory와 연결
            SearchHistoryEntity searchHistory = searchHistoryRepository.getReferenceById(firstDetectionDataDto.getSearchId());
            //과정 4 : imgaepath한줄씩 database에 업로드
            for (FirstDetectionDataDto.ImageData imageData : firstDetectionDataDto.getData()) {
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
