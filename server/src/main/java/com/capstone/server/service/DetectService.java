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
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
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
    //todo : cctv 선정 알고리즘 반영 (이건 추후에 어떻게 파라미터를 넣고 결과가 오는지 알려주시면 연결하겠습니다)
    public DetectionResponseDto callDetectAPI(Long id, Step step) throws CustomException {
        try {
            //과정1 : 실종자 id가 db에 있는지 확인합니다. (이건 수정해야될듯 (불필요한 db요청이 너무 많아지는거 같기도 함)
            MissingPeopleEntity missingPeople = missingPeopleRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + id));
            //과정2 : ai server요청에 쓸 dto를생성합니다
            DetectionRequestDto detectionRequestDto = DetectionRequestDto.fromEntity(missingPeople);
            //과정3 : 탐색 step을 지정합니다 (s3폴더구조때문에 전달받아야합니다)
            detectionRequestDto.setStep(step);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            //HttpEntity 생성
            HttpEntity<DetectionRequestDto> request = new HttpEntity<>(detectionRequestDto, headers);
            //요청 및 응답반환
            return restTemplate.postForObject(url, request, DetectionResponseDto.class);
        } catch (NoSuchElementException e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }

    @Transactional
    public void postDetectionResult(DetectionResultDto detectionResultDto) throws CustomException {
        try {
            //실종자 정보에 한국어 쿼리 업데이트
            //과정 1 : missing people id 있나 검사
            MissingPeopleEntity missingPeople = missingPeopleRepository.findById(detectionResultDto.getMissingPeopleId()).orElse(null);
            //과정 2 : 무조건 쿼리가 오는데, 이미 저장되어있으면 덮어쓰기 안함. 만약 착장정보 수정이 가능하다면 업데이트 기능 만들어야 할듯
            if (missingPeople != null && missingPeople.getQuery() == null) {
                missingPeople.setKoQuery(detectionResultDto.getKoQuery());
                missingPeople.setQuery(detectionResultDto.getQuery());
                //쿼리가 없으면 1차탐색이였던것이 분명하니 상호작용단계로 수정 TODO : 1차를 여러번할때를 대비해 수정해야할듯
                missingPeople.setStep(Step.valueOf("BETWEEN"));
                missingPeopleRepository.save(missingPeople);
            }
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
