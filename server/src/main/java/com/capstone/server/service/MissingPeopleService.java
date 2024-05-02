package com.capstone.server.service;


import com.capstone.server.code.ErrorCode;
import com.capstone.server.dto.*;
import com.capstone.server.exception.CustomException;
import com.capstone.server.model.GuardianEntity;
import com.capstone.server.model.MissingPeopleDetailEntity;
import com.capstone.server.model.MissingPeopleEntity;
import com.capstone.server.model.SearchHistoryEntity;
import com.capstone.server.model.enums.MissingPeopleSortBy;
import com.capstone.server.model.enums.Status;
import com.capstone.server.model.enums.Step;
import com.capstone.server.repository.GuardianRepository;
import com.capstone.server.repository.MissingPeopleDetailRepository;
import com.capstone.server.repository.MissingPeopleRepository;
import com.capstone.server.repository.SearchHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

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
    @Autowired
    private S3Service s3Service;
    @Autowired
    private SearchHistoryService searchHistoryService;
    @Autowired
    private KafkaProducerService kafkaProducerService;

    @Transactional
    // public MissingPeopleCreateResponseDto createMissingPeople(MissingPeopleCreateRequestDto missingPeopleCreateRequestDto) {
    public MissingPeopleCreateResponseDto createMissingPeople(MissingPeopleCreateRequestDto missingPeopleCreateRequestDto) {
        try {
            MissingPeopleEntity missingPeopleEntity = missingPeopleCreateRequestDto.toMissingPeopleEntity();
            MissingPeopleDetailEntity missingPeopleDetailEntity = missingPeopleCreateRequestDto.toMissingPeopleDetailEntity();
            GuardianEntity guardianEntity = missingPeopleCreateRequestDto.toGuardianEntity();
            SearchHistoryEntity searchHistoryEntity = missingPeopleCreateRequestDto.toSearchHistoryEntity();
            missingPeopleEntity.setStep(Step.valueOf("FIRST"));
            // 연관관계 설정
            missingPeopleEntity.setMissingPeopleDetailEntity(missingPeopleDetailEntity);
            missingPeopleEntity.setGuardianEntity(guardianEntity);
            missingPeopleDetailEntity.setMissingPeopleEntity(missingPeopleEntity);
            guardianEntity.setMissingPeopleEntity(missingPeopleEntity);
            searchHistoryEntity.setMissingPeopleEntity(missingPeopleEntity);

            // 검색 기록 추가
            missingPeopleEntity.addSearchHistoryEntities(searchHistoryEntity);

            MissingPeopleEntity savedMissingPeopleEntity = missingPeopleRepository.save(missingPeopleEntity);
            System.out.println("-----------------------");
            System.out.println(savedMissingPeopleEntity.getSearchHistoryEntities().get(0).getId());
            kafkaProducerService.startSearchingToKafka(KafkaDto.fromEntity(savedMissingPeopleEntity, savedMissingPeopleEntity.getSearchHistoryEntities().get(0)));

            return MissingPeopleCreateResponseDto.fromEntity(savedMissingPeopleEntity);

        } catch (DataIntegrityViolationException e) {
            // TODO : 에러 처리 확실히 분리해서 대응 변경
            throw new CustomException(ErrorCode.DATA_INTEGRITY_VALIDATION_ERROR, e);

        } catch (Exception e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }

    public List<MissingPeopleResponseDto> getAllMissingPeople(int page, int pageSize, MissingPeopleSortBy sortBy) {

        Pageable pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, sortBy.getValue()));
        Page<MissingPeopleEntity> missingPeoplePage = missingPeopleRepository.findAll(pageable);

        List<MissingPeopleResponseDto> missingPeopleDtos = missingPeoplePage.getContent().stream()
                .map(MissingPeopleResponseDto::fromEntity) // 엔티티를 DTO로 변환
                .collect(Collectors.toList());

        return missingPeopleDtos;
    }

    public List<MissingPeopleResponseDto> getAllMissingPeopleByStatus(int page, int pageSize, MissingPeopleSortBy sortBy, Status status) {

        Pageable pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, sortBy.getValue()));
        Page<MissingPeopleEntity> missingPeoplePage = missingPeopleRepository.findByStatus(pageable, status);

        List<MissingPeopleResponseDto> missingPeopleDtos = missingPeoplePage.getContent().stream()
                .map(MissingPeopleResponseDto::fromEntity) // 엔티티를 DTO로 변환
                .collect(Collectors.toList());

        return missingPeopleDtos;
    }

    public List<MissingPeopleResponseDto> getAllMissingPeopleByNameContaining(int page, int pageSize, MissingPeopleSortBy sortBy, String name) {

        Pageable pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, sortBy.getValue()));

        Page<MissingPeopleEntity> missingPeoplePage = missingPeopleRepository.findByNameContaining(pageable, name.trim());

        List<MissingPeopleResponseDto> missingPeopleDtos = missingPeoplePage.getContent().stream()
                .map(MissingPeopleResponseDto::fromEntity) // 엔티티를 DTO로 변환
                .collect(Collectors.toList());

        return missingPeopleDtos;
    }

    public List<MissingPeopleResponseDto> getAllMissingPeopleByNameContainingAndStatus(int page, int pageSize, MissingPeopleSortBy sortBy, String name, Status status) {

        Pageable pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, sortBy.getValue()));

        Page<MissingPeopleEntity> missingPeoplePage = missingPeopleRepository.findByNameContainingAndStatus(pageable, name.trim(), status);

        List<MissingPeopleResponseDto> missingPeopleDtos = missingPeoplePage.getContent().stream()
                .map(MissingPeopleResponseDto::fromEntity) // 엔티티를 DTO로 변환
                .collect(Collectors.toList());

        return missingPeopleDtos;
    }

    public MissingPeopleResponseDto getMissingPeopleById(Long id) {
        try {
            MissingPeopleEntity missingPeopleEntity = missingPeopleRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + id));
            return MissingPeopleResponseDto.fromEntity(missingPeopleEntity);
        } catch (NoSuchElementException e) {
            throw new CustomException(ErrorCode.MISSING_PEOPLE_NOT_FOUND_BY_ID, e);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }

    @Transactional
    public void modifyStatus(Long id, Status status) {
        MissingPeopleEntity missingPeopleEntity = missingPeopleRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.BAD_REQUEST));

        missingPeopleEntity.setStatus(status);
    }

    public S3UploadResponseDto uploadImageToS3(MultipartFile image, String imagePath, Long id) {
        this.getMissingPeopleById(id);
        return s3Service.upload(image, imagePath);
    }

    public S3DownloadResponseDto downloadImageFromS3(String imagePath, Long id) {
        this.getMissingPeopleById(id);
        return s3Service.download(imagePath).get(0);
    }

    public List<S3UploadResponseDto> uploadImagesToS3(List<MultipartFile> images, String imagePath, Long id, Long searchHistoryId) {
        this.getMissingPeopleById(id);
        searchHistoryService.getSearchHistoryById(searchHistoryId);
        return s3Service.upload(images, imagePath);
    }

    public List<S3DownloadResponseDto> downloadImagesFromS3(String imagePath, Long id, Long searchHistoryId) {
        this.getMissingPeopleById(id);
        searchHistoryService.getSearchHistoryById(searchHistoryId);
        return s3Service.download(imagePath);
    }

    //todo : (필요에따라서) 탐색단계를 뒤로 못가게 해야함.
    public StepDto changeStatus(StepDto stepDto) {
        long missingPeopleId = stepDto.getMissingPeopleId();
        Step step = stepDto.getStep();
        MissingPeopleEntity missingPeople = missingPeopleRepository.findById(missingPeopleId).
                orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + missingPeopleId));
        try {
            missingPeople.setStep(step);
            missingPeopleRepository.save(missingPeople);
            return new StepDto(missingPeopleId, step);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }

    public StepDto getStatus(Long missingPeopleId) {
        MissingPeopleEntity missingPeople = missingPeopleRepository.findById(missingPeopleId).
                orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + missingPeopleId));
        return StepDto.fromEntity(missingPeople);
    }

    // public List<S3UploadResponseDto> uploadSearchHistoryImageToS3(Long id, Long searchHistoryId ,List<MultipartFile> images, String setUploadImageName) {
    //     this.getMissingPeopleById(id);
    //     searchHistoryService.getSearchHistoryById(searchHistoryId);
    //     return s3Service.upload(images, setUploadImageName);
    // }

    // public S3DownloadResponseDto downloadProfileImageFromS3(Long id, String downloadImageName) {
    //     this.getMissingPeopleById(id);
    //     return s3Service.download(downloadImageName);
    // }
}
