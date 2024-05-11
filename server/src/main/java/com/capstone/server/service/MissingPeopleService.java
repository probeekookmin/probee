package com.capstone.server.service;


import com.capstone.server.code.ErrorCode;
import com.capstone.server.dto.*;
import com.capstone.server.dto.guardian.DetectionResultDto;
import com.capstone.server.exception.CustomException;
import com.capstone.server.model.*;
import com.capstone.server.model.enums.MissingPeopleSortBy;
import com.capstone.server.model.enums.SearchResultSortBy;
import com.capstone.server.model.enums.Status;
import com.capstone.server.model.enums.Step;
import com.capstone.server.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.capstone.server.code.ErrorCode.DATA_INTEGRITY_VALIDATION_ERROR;

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
    @Autowired
    private SearchResultRepository searchResultRepository;
    @Autowired
    private BetweenRepository betweenRepository;

    @Transactional

    public MissingPeopleCreateResponseDto createMissingPeople(MissingPeopleCreateRequestDto missingPeopleCreateRequestDto) throws CustomException {
        try {
            MissingPeopleEntity missingPeopleEntity = missingPeopleCreateRequestDto.toMissingPeopleEntity();
            MissingPeopleDetailEntity missingPeopleDetailEntity = missingPeopleCreateRequestDto.toMissingPeopleDetailEntity();
            GuardianEntity guardianEntity = missingPeopleCreateRequestDto.toGuardianEntity();
            SearchHistoryEntity searchHistoryEntity = missingPeopleCreateRequestDto.toSearchHistoryEntity();
            missingPeopleEntity.setStep(Step.valueOf("FIRST"));
            searchHistoryEntity.setStep(Step.valueOf("FIRST"));
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
//            kafkaProducerService.startSearchingToKafka(KafkaDto.fromEntity(savedMissingPeopleEntity, savedMissingPeopleEntity.getSearchHistoryEntities().get(0)));

            return MissingPeopleCreateResponseDto.fromEntity(savedMissingPeopleEntity);

        } catch (DataIntegrityViolationException e) {
            // TODO : 에러 처리 확실히 분리해서 대응 변경
            throw new CustomException(DATA_INTEGRITY_VALIDATION_ERROR, e);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }

    public List<MissingPeopleListResponseDto> getAllMissingPeople(int page, int pageSize, MissingPeopleSortBy sortBy) {

        Pageable pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, sortBy.getValue()));
        Page<MissingPeopleEntity> missingPeoplePage = missingPeopleRepository.findAll(pageable);

        List<MissingPeopleListResponseDto> missingPeopleDtos = missingPeoplePage.getContent().stream()
                .map(MissingPeopleListResponseDto::fromEntity) // 엔티티를 DTO로 변환
                .collect(Collectors.toList());

        return missingPeopleDtos;
    }

    public List<MissingPeopleListResponseDto> getAllMissingPeopleByStatus(int page, int pageSize, MissingPeopleSortBy sortBy, Status status) {

        Pageable pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, sortBy.getValue()));
        Page<MissingPeopleEntity> missingPeoplePage = missingPeopleRepository.findByStatus(pageable, status);

        List<MissingPeopleListResponseDto> missingPeopleDtos = missingPeoplePage.getContent().stream()
                .map(MissingPeopleListResponseDto::fromEntity) // 엔티티를 DTO로 변환
                .collect(Collectors.toList());

        return missingPeopleDtos;
    }

    public List<MissingPeopleListResponseDto> getAllMissingPeopleByNameContaining(int page, int pageSize, MissingPeopleSortBy sortBy, String name) {

        Pageable pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, sortBy.getValue()));

        Page<MissingPeopleEntity> missingPeoplePage = missingPeopleRepository.findByNameContaining(pageable, name.trim());

        List<MissingPeopleListResponseDto> missingPeopleDtos = missingPeoplePage.getContent().stream()
                .map(MissingPeopleListResponseDto::fromEntity) // 엔티티를 DTO로 변환
                .collect(Collectors.toList());

        return missingPeopleDtos;
    }

    public List<MissingPeopleListResponseDto> getAllMissingPeopleByNameContainingAndStatus(int page, int pageSize, MissingPeopleSortBy sortBy, String name, Status status) {

        Pageable pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, sortBy.getValue()));

        Page<MissingPeopleEntity> missingPeoplePage = missingPeopleRepository.findByNameContainingAndStatus(pageable, name.trim(), status);

        List<MissingPeopleListResponseDto> missingPeopleDtos = missingPeoplePage.getContent().stream()
                .map(MissingPeopleListResponseDto::fromEntity) // 엔티티를 DTO로 변환
                .collect(Collectors.toList());

        return missingPeopleDtos;
    }

    public MissingPeopleDetailResponseDto getMissingPeopleById(Long id) throws CustomException {
        try {
            MissingPeopleEntity missingPeopleEntity = missingPeopleRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + id));
            MissingPeopleDetailResponseDto missingPeopleDetailResponseDto = MissingPeopleDetailResponseDto.fromEntity(missingPeopleEntity);
            //보호자 정보 가져오기
            GuardianEntity guardianEntity = guardianRepository.findByMissingPeopleEntityId(id);
            missingPeopleDetailResponseDto.setGuardianName(guardianEntity.getName());
            missingPeopleDetailResponseDto.setPhoneNumber(guardianEntity.getPhoneNumber());
            missingPeopleDetailResponseDto.setRelationship(guardianEntity.getRelationship());

            return missingPeopleDetailResponseDto;
        } catch (NoSuchElementException e) {
            throw new CustomException(ErrorCode.MISSING_PEOPLE_NOT_FOUND_BY_ID, e);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }

    @Transactional
    public void modifyStatus(Long id, Status status) {
        MissingPeopleEntity missingPeopleEntity = missingPeopleRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + id));

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

    public void setProfileImagePath(Long id, String imagePath) {
        MissingPeopleEntity missingPeopleEntity = missingPeopleRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + id));
        missingPeopleEntity.setProfileImage(imagePath);
        missingPeopleRepository.save(missingPeopleEntity);
    }

    public List<SearchHistoryListDto> getSearchHistoryList(Long id) {
        missingPeopleRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + id));
        List<SearchHistoryEntity> searchHistory = searchHistoryRepository.findByMissingPeopleEntityId(id);
        List<SearchHistoryListDto> searchHistoryDtos = new ArrayList<>();
        for (SearchHistoryEntity searchHistoryEntity : searchHistory) {
            searchHistoryDtos.add(SearchHistoryListDto.fromEntity(searchHistoryEntity));
        }
        return searchHistoryDtos;
    }

    //탐색 id로 detection 결과 받아오기
    public SearchResultResponse<? extends DetectionResultDto> getSearchResultBySearchId(long id, long searchId, int page, int pageSize, SearchResultSortBy sortBy) {
        //유효성검사
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
        //유효성검사
        MissingPeopleEntity missingPeopleEntity = missingPeopleRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + id));
        SearchHistoryEntity searchHistory = searchHistoryRepository.findFirstByMissingPeopleEntityAndStepOrderByCreatedAtDesc(missingPeopleEntity, step);

        Page<SearchResultEntity> searchResultPages = getSearchResultEntity(page, pageSize, sortBy, searchHistory);
        return makeResultResponse(searchResultPages, dtoClass);
    }


    //사용자가 고른 사진을 join을 활용해 검색 후 페이지 반환
    public SearchResultResponse<? extends DetectionResultDto> getBetweenResult(long id, int page, int pageSize, Class<? extends DetectionResultDto> dtoClass) {
        //해당 Id의 최신 탐색 가져오기
        MissingPeopleEntity missingPeopleEntity = missingPeopleRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + id));
        SearchHistoryEntity searchHistory = searchHistoryRepository.findFirstByMissingPeopleEntityAndStepOrderByCreatedAtDesc(missingPeopleEntity, Step.fromValue("first"));
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<SearchResultEntity> searchResultPages = betweenRepository.findAllBySearchHistoryEntity(pageable, searchHistory);
        if (searchResultPages.isEmpty()) {
            throw new CustomException(ErrorCode.RESULT_NOT_FOUND, "Result Not Found", "선정한 사진이 없습니다.");
        }
        return makeResultResponse(searchResultPages, dtoClass);
    }

    //쿼리에 관련된 데이터를 받아 searchHistory pages를 반환해줌
    private Page<SearchResultEntity> getSearchResultEntity(int page, int pageSize, SearchResultSortBy sortBy, SearchHistoryEntity searchHistory) {
        Pageable pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, sortBy.getSortBy()));
        Page<SearchResultEntity> searchResultPages = searchResultRepository.findAllBySearchHistoryEntity(pageable, searchHistory);
        if (searchResultPages.isEmpty()) {
            throw new CustomException(ErrorCode.RESULT_NOT_FOUND, "Result Not Found", "결과가 없습니다.");
        }
        return searchResultPages;
    }

    //pages의 결과를 받아 직력화 및 캡슐화 진행
    private SearchResultResponse<? extends DetectionResultDto> makeResultResponse(Page<SearchResultEntity> searchResultPages, Class<? extends DetectionResultDto> dtoClass) {
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
