package com.capstone.server.service;


import com.capstone.server.code.ErrorCode;
import com.capstone.server.dto.guardian.BetweenRequestDto;
import com.capstone.server.dto.guardian.MissingPeopleForGuardianDto;
import com.capstone.server.exception.CustomException;
import com.capstone.server.model.BetweenEntity;
import com.capstone.server.model.MissingPeopleEntity;
import com.capstone.server.model.SearchResultEntity;
import com.capstone.server.repository.BetweenRepository;
import com.capstone.server.repository.MissingPeopleRepository;
import com.capstone.server.repository.SearchHistoryRepository;
import com.capstone.server.repository.SearchResultRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class GuardianService {
    @Autowired
    SearchHistoryRepository searchHistoryRepository;
    @Autowired
    private MissingPeopleRepository missingPeopleRepository;
    @Autowired
    private SearchResultRepository searchResultRepository;
    @Autowired
    private BetweenRepository betweenRepository;

    public MissingPeopleForGuardianDto getMissingPeople(Long id) {
        MissingPeopleEntity missingPeopleEntity = missingPeopleRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + id));
        return MissingPeopleForGuardianDto.fromEntity(missingPeopleEntity);
    }


    @Transactional
    public void postBetween(Long id, BetweenRequestDto betweenRequestDto) {
        try {
            MissingPeopleEntity missingPeopleEntity = missingPeopleRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + id));
            SearchResultEntity searchResultEntity = null;
            for (Long resultId : betweenRequestDto.getResultIds()) { //TODO : 반복문을 돌며 저장해 db호출이 너무많음. //유효성검사도 더 해야될듯
                searchResultEntity = searchResultRepository.findById(resultId)
                        .orElseThrow(() -> new NoSuchElementException("Result Not Found " + resultId));
                BetweenEntity betweenEntity = new BetweenEntity(missingPeopleEntity, searchResultEntity);
                //todo : 실종자 step변경 추가
                betweenRepository.save(betweenEntity);
            }
        } catch (Exception e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }
}
