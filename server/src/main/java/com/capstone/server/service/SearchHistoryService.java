package com.capstone.server.service;

import com.capstone.server.code.ErrorCode;
import com.capstone.server.dto.SearchHistoryListDto;
import com.capstone.server.dto.SearchRangeDto;
import com.capstone.server.dto.SearchRequestDto;
import com.capstone.server.exception.CustomException;
import com.capstone.server.model.MissingPeopleEntity;
import com.capstone.server.model.SearchHistoryEntity;
import com.capstone.server.model.enums.Step;
import com.capstone.server.repository.MissingPeopleRepository;
import com.capstone.server.repository.SearchHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class SearchHistoryService {
    @Autowired
    private SearchHistoryRepository searchHistoryRepository;
    @Autowired
    private MissingPeopleRepository missingPeopleRepository;

    public SearchRangeDto getSearchHistoryBySearchId(Long searchId) {
        try {
            SearchHistoryEntity searchHistoryEntity = searchHistoryRepository.findById(searchId)
                    .orElseThrow(() -> new NoSuchElementException("Search History not found with search-ID: " + searchId));
            return SearchRangeDto.fromEntity(searchHistoryEntity);
        } catch (NoSuchElementException e) {
            // TODO : 에러코드 수정
            throw new CustomException(ErrorCode.MISSING_PEOPLE_NOT_FOUND_BY_ID, e);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }

    public SearchRangeDto getSearchHistoryById(Long id) {
        try {
            SearchHistoryEntity searchHistoryEntity = searchHistoryRepository.findFirstByMissingPeopleEntityIdOrderByCreatedAtAsc(id);
            return SearchRangeDto.fromEntity(searchHistoryEntity);
        } catch (NoSuchElementException e) {
            // TODO : 에러코드 수정
            throw new CustomException(ErrorCode.MISSING_PEOPLE_NOT_FOUND_BY_ID, e);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }

    @Transactional
    public void modifyStep(Long id, Step step) {
        SearchHistoryEntity searchHistoryEntity = searchHistoryRepository.findById(id)
                // TODO : 에러 수정
                .orElseThrow(() -> new CustomException(ErrorCode.BAD_REQUEST));

        searchHistoryEntity.setStep(step);
    }

    //탐색 기록 가져오기
    public List<SearchHistoryListDto> getSearchHistoryList(Long id) {
        List<SearchHistoryEntity> searchHistory = searchHistoryRepository.findByMissingPeopleEntityId(id);
        List<SearchHistoryListDto> searchHistoryDtos = new ArrayList<>();
        for (SearchHistoryEntity searchHistoryEntity : searchHistory) {
            if (searchHistoryEntity.getStep() != Step.FIRST) continue;
            searchHistoryDtos.add(SearchHistoryListDto.fromEntity(searchHistoryEntity));
        }
        return searchHistoryDtos;
    }

    //탐색 시작하기
    @Transactional
    public Long createSearchHistory(SearchRequestDto searchRequestDto, Long missingPeopleId, Step step) {
        //검색기록 생성
        MissingPeopleEntity missingPeopleEntity = missingPeopleRepository.findById(missingPeopleId)
                .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + missingPeopleId));
        SearchHistoryEntity searchHistoryEntity = searchRequestDto.toSearchHistoryEntity();
        searchHistoryEntity.setMissingPeopleEntity(missingPeopleEntity);
        searchHistoryEntity.setStep(step);
        //실종자 step을 First로 설정
        missingPeopleEntity.setStep(step);
        return searchHistoryRepository.save(searchHistoryEntity).getId();
    }

}
