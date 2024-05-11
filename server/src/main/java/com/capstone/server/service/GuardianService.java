package com.capstone.server.service;


import com.capstone.server.dto.StepDto;
import com.capstone.server.dto.guardian.BetweenPostRequestDto;
import com.capstone.server.dto.guardian.MissingPeopleForGuardianDto;
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

    public StepDto getStep(Long id) {
        MissingPeopleEntity missingPeopleEntity = missingPeopleRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + id));
        return StepDto.fromEntity(missingPeopleEntity);
    }


    @Transactional
    public Object postBetween(Long id, BetweenPostRequestDto betweenPostRequestDto) {
        try {
            MissingPeopleEntity missingPeopleEntity = missingPeopleRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + id));
//        //가장 최신의 searchHistory num 가져오기. (1차를 여러번 할 수 있기때문에 나중에 정보를 가져올때 join해서
//        SearchHistoryEntity searchHistory = searchHistoryRepository.findFirstByMissingPeopleEntityAndStepOrderByCreatedAtDesc(missingPeopleEntity, Step.valueOf("first"));
            for (Long resultId : betweenPostRequestDto.getResultIds()) { //TODO : 반복문을 돌며 저장해 db호출이 너무많음.
                SearchResultEntity searchResultEntity = searchResultRepository.findById(resultId)
                        .orElseThrow(() -> new NoSuchElementException("Result Not Found " + resultId));
                BetweenEntity betweenEntity = new BetweenEntity(missingPeopleEntity, searchResultEntity);
                betweenRepository.save(betweenEntity);
            }
            return "success";
        } catch (Exception e) {
            return "fail";
        }
    }
}
