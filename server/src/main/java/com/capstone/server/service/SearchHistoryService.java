package com.capstone.server.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.server.code.ErrorCode;
import com.capstone.server.dto.SearchHistoryDto;
import com.capstone.server.exception.CustomException;
import com.capstone.server.model.SearchHistoryEntity;
import com.capstone.server.repository.SearchHistoryRepository;

@Service
public class SearchHistoryService {
    @Autowired
    private SearchHistoryRepository searchHistoryRepository;

    public SearchHistoryDto getSearchHistoryById(Long id) {
        try{
            SearchHistoryEntity searchHistoryEntity = searchHistoryRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + id));
            return SearchHistoryDto.fromEntity(searchHistoryEntity);
        } catch (NoSuchElementException e) {
            // TODO : 에러코드 수정
            throw new CustomException(ErrorCode.MISSING_PEOPLE_NOT_FOUND_BY_ID , e);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }
}
