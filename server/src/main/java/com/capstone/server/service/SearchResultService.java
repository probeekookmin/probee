package com.capstone.server.service;

import com.capstone.server.dto.SearchResultResponse;
import com.capstone.server.dto.detectionResult.DetectionResultDetailDto;
import com.capstone.server.dto.detectionResult.DetectionResultDto;
import com.capstone.server.exception.CustomException;
import com.capstone.server.model.SearchHistoryEntity;
import com.capstone.server.model.SearchResultEntity;
import com.capstone.server.model.enums.SearchResultSortBy;
import com.capstone.server.model.enums.Step;
import com.capstone.server.repository.BetweenRepository;
import com.capstone.server.repository.MissingPeopleRepository;
import com.capstone.server.repository.SearchHistoryRepository;
import com.capstone.server.repository.SearchResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.capstone.server.code.ErrorCode.DATA_INTEGRITY_VALIDATION_ERROR;

@Service
public class SearchResultService {
    @Autowired
    private MissingPeopleRepository missingPeopleRepository;
    @Autowired
    private SearchHistoryRepository searchHistoryRepository;
    @Autowired
    public SearchHistoryService searchHistoryService;
    @Autowired
    private SearchResultRepository searchResultRepository;
    @Autowired
    private BetweenRepository betweenRepository;

    //탐색 id로 detection 결과 받아오기
    public SearchResultResponse<? extends DetectionResultDto> getSearchResultBySearchId(long id, long searchId, int page, int pageSize, SearchResultSortBy sortBy) {
        //유효성검사 todo : 다른 함수도 쓸 수 있게 리팩토링 현재 나머지 함수는 다 빼놓은 상태
        missingPeopleRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + id));
        SearchHistoryEntity searchHistory = searchHistoryRepository.findById(searchId).orElseThrow(() -> new NoSuchElementException("searchId not found with ID" + id));
        //id와 searchid가 맞지않으면 에러발생
        if (!Objects.equals(searchHistory.getMissingPeopleEntity().getId(), id)) {
            throw new CustomException(DATA_INTEGRITY_VALIDATION_ERROR, "Not matched", "missingPeople id and search-id Do not matched");
        }
        Page<SearchResultEntity> searchResultPages = getSearchResultEntity(page, pageSize, sortBy, searchHistory);
        return makeResultResponse(searchResultPages, DetectionResultDetailDto.class);
    }

    //탐색 단계로 detection 결과 받아오기
    public SearchResultResponse<? extends DetectionResultDto> getSearchResultByStep(long id, Step step, int page, int pageSize, SearchResultSortBy sortBy, Class<? extends DetectionResultDto> dtoClass) {
        SearchHistoryEntity searchHistory = searchHistoryRepository.findFirstByMissingPeopleEntityIdAndStepOrderByCreatedAtDesc(id, step);
        Page<SearchResultEntity> searchResultPages = getSearchResultEntity(page, pageSize, sortBy, searchHistory);
        return makeResultResponse(searchResultPages, dtoClass);
    }


    //사용자가 고른 사진을 join을 활용해 검색 후 페이지 반환
    public SearchResultResponse<? extends DetectionResultDto> getBetweenResult(long id, int page, int pageSize, Class<? extends DetectionResultDto> dtoClass) {
        Step step = Step.fromValue("first");
        //해당 Id의 최신 탐색 가져오기
        SearchHistoryEntity searchHistory = searchHistoryRepository.findFirstByMissingPeopleEntityIdAndStepOrderByCreatedAtDesc(id, step);
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<SearchResultEntity> searchResultPages = betweenRepository.findAllBySearchHistoryEntity(pageable, searchHistory);
        return makeResultResponse(searchResultPages, dtoClass);
    }

    //SearchHistoryEntity를  받아 searchResult pages를 반환해줌
    private Page<SearchResultEntity> getSearchResultEntity(int page, int pageSize, SearchResultSortBy sortBy, SearchHistoryEntity searchHistory) {
        Pageable pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, sortBy.getSortBy()));
        Page<SearchResultEntity> searchResultPages = searchResultRepository.findAllBySearchHistoryEntity(pageable, searchHistory);
        return searchResultPages;
    }

    //searchResult pages를 받아 직력화 및 캡슐화 진행
    private SearchResultResponse<? extends DetectionResultDto> makeResultResponse(Page<SearchResultEntity> searchResultPages, Class<? extends DetectionResultDto> dtoClass) {
//        if (searchResultPages.isEmpty()) {
//            throw new CustomException(ErrorCode.RESULT_NOT_FOUND, "Result Not Found", "결과가 없습니다.");
//        }
        long totalCount = searchResultPages.getTotalElements();
        List<DetectionResultDto> resultList = searchResultPages.getContent().stream()
                .map(entity -> {
                    if (dtoClass.equals(DetectionResultDetailDto.class)) {
                        return DetectionResultDetailDto.fromEntity(entity);
                    } else if (dtoClass.equals(DetectionResultDto.class)) {
                        return DetectionResultDto.fromEntity(entity);
                    } else {
                        throw new IllegalArgumentException("Unsupported DTO class: " + dtoClass);
                    }
                })
                .collect(Collectors.toList());
        return new SearchResultResponse<>(totalCount, resultList);
    }
}
