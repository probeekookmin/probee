package com.capstone.server.service;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capstone.server.code.ErrorCode;
import com.capstone.server.dto.MissingPeopleCreateRequestDto;
import com.capstone.server.dto.MissingPeopleCreateResponseDto;
import com.capstone.server.dto.MissingPeopleResponseDto;
import com.capstone.server.dto.UserUpdateRequestDto;
import com.capstone.server.exception.CustomException;
import com.capstone.server.model.GuardianEntity;
import com.capstone.server.model.MissingPeopleDetailEntity;
import com.capstone.server.model.MissingPeopleEntity;
import com.capstone.server.model.SearchHistoryEntity;
import com.capstone.server.model.UserEntity;
import com.capstone.server.repository.GuardianRepository;
import com.capstone.server.repository.MissingPeopleDetailRepository;
import com.capstone.server.repository.MissingPeopleRepository;
import com.capstone.server.repository.SearchHistoryRepository;
import com.capstone.server.repository.UserRepository;

@Service
public class MissingPeopleService {

    @Autowired
    private MissingPeopleDetailRepository missingPeopleDetailRepository;
    @Autowired
    private MissingPeopleRepository missingPeopleRepository;
    @Autowired
    private GuardianRepository guardianRepository;
    @Autowired
    private SearchHistoryRepository searchHistoryRepository;

    @Transactional
    public MissingPeopleCreateResponseDto createMissingPeople(MissingPeopleCreateRequestDto missingPeopleCreateRequestDto) {
        try {
            MissingPeopleEntity missingPeopleEntity = missingPeopleCreateRequestDto.toMissingPeopleEntity();
            MissingPeopleDetailEntity missingPeopleDetailEntity = missingPeopleCreateRequestDto.toMissingPeopleDetailEntity();
            GuardianEntity guardianEntity = missingPeopleCreateRequestDto.toGuardianEntity();
            SearchHistoryEntity searchHistoryEntity = missingPeopleCreateRequestDto.toSearchHistoryEntity();

            // 연관관계 설정
            missingPeopleEntity.setMissingPeopleDetailEntity(missingPeopleDetailEntity);
            missingPeopleEntity.setGuardianEntity(guardianEntity);
            missingPeopleDetailEntity.setMissingPeopleEntity(missingPeopleEntity);
            guardianEntity.setMissingPeopleEntity(missingPeopleEntity);
            searchHistoryEntity.setMissingPeopleEntity(missingPeopleEntity);
            
            // 검색 기록 추가
            missingPeopleEntity.addSearchHistoryEntities(searchHistoryEntity);

            return MissingPeopleCreateResponseDto.fromEntity(missingPeopleRepository.save(missingPeopleEntity));
            
        } catch (DataIntegrityViolationException e) {
            // TODO : 에러 처리 확실히 분리해서 대응 변경
            System.out.println(e);
            throw new CustomException(ErrorCode.DATA_INTEGRITY_VALIDATION_ERROR, e);

        } catch (Exception e) {
            System.out.println(e);
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }

    public List<MissingPeopleResponseDto> getAllMissingPeople() {
        return missingPeopleRepository.findAll().stream()
                .map(MissingPeopleResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    public MissingPeopleResponseDto getMissingPeopleById(Long id) {
        try {
            MissingPeopleEntity missingPeopleEntity = missingPeopleRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + id));
            return MissingPeopleResponseDto.fromEntity(missingPeopleEntity);
        } catch (NoSuchElementException e) {
            throw new CustomException(ErrorCode.MISSING_PEOPLE_NOT_FOUND_BY_ID , e);
        } catch (Exception e) {
            System.out.println(e);
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }
}
