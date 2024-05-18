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

import static com.capstone.server.code.ErrorCode.DATA_INTEGRITY_VALIDATION_ERROR;

@Service
public class MissingPeopleService {

    @Autowired
    private MissingPeopleRepository missingPeopleRepository;
    @Autowired
    private SearchHistoryRepository searchHistoryRepository;
    @Autowired
    private GuardianRepository guardianRepository;
    @Autowired
    private S3Service s3Service;
    @Autowired
    public SearchHistoryService searchHistoryService;
    @Autowired
    private CCTVService cctvService;


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

            return MissingPeopleCreateResponseDto.fromEntity(savedMissingPeopleEntity);

        } catch (DataIntegrityViolationException e) {
            // TODO : 에러 처리 확실히 분리해서 대응 변경
            throw new CustomException(DATA_INTEGRITY_VALIDATION_ERROR, e);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }

    //모든 실종자 리스트 가져오기
    public List<MissingPeopleListResponseDto> getAllMissingPeople(int page, int pageSize, MissingPeopleSortBy sortBy) {

        Pageable pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, sortBy.getValue()));
        Page<MissingPeopleEntity> missingPeoplePage = missingPeopleRepository.findAll(pageable);

        return missingPeoplePage.getContent().stream()
                .map(MissingPeopleListResponseDto::fromEntity) // 엔티티를 DTO로 변환
                .collect(Collectors.toList());
    }

    //실종자 리스트 상태별 가져오기
    public List<MissingPeopleListResponseDto> getAllMissingPeopleByStatus(int page, int pageSize, MissingPeopleSortBy sortBy, Status status) {

        Pageable pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, sortBy.getValue()));
        Page<MissingPeopleEntity> missingPeoplePage = missingPeopleRepository.findByStatus(pageable, status);

        return missingPeoplePage.getContent().stream()
                .map(MissingPeopleListResponseDto::fromEntity) // 엔티티를 DTO로 변환
                .collect(Collectors.toList());
    }

    //실종자 리스트 이름 검색
    public List<MissingPeopleListResponseDto> getAllMissingPeopleByNameContaining(int page, int pageSize, MissingPeopleSortBy sortBy, String name) {

        Pageable pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, sortBy.getValue()));

        Page<MissingPeopleEntity> missingPeoplePage = missingPeopleRepository.findByNameContaining(pageable, name.trim());

        return missingPeoplePage.getContent().stream()
                .map(MissingPeopleListResponseDto::fromEntity) // 엔티티를 DTO로 변환
                .collect(Collectors.toList());
    }

    //실종자 리스트 상태별 이름검색
    public List<MissingPeopleListResponseDto> getAllMissingPeopleByNameContainingAndStatus(int page, int pageSize, MissingPeopleSortBy sortBy, String name, Status status) {

        Pageable pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, sortBy.getValue()));

        Page<MissingPeopleEntity> missingPeoplePage = missingPeopleRepository.findByNameContainingAndStatus(pageable, name.trim(), status);

        return missingPeoplePage.getContent().stream()
                .map(MissingPeopleListResponseDto::fromEntity) // 엔티티를 DTO로 변환
                .collect(Collectors.toList());
    }

    //실종자 세부정보 가져오기
    public MissingPeopleDetailResponseDto getMissingPeopleById(Long missingPeopleId) throws CustomException {
        try {
            MissingPeopleEntity missingPeopleEntity = getMissingPeopleEntity(missingPeopleId);
            MissingPeopleDetailResponseDto missingPeopleDetailResponseDto = MissingPeopleDetailResponseDto.fromEntity(missingPeopleEntity);
            //보호자 정보 가져오기 todo : refectoring
            GuardianEntity guardianEntity = guardianRepository.findByMissingPeopleEntityId(missingPeopleId);
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

    //실종자 상태 수정
    @Transactional
    public void modifyStatus(Long missingPeopleId, Status status) {
        MissingPeopleEntity missingPeopleEntity = getMissingPeopleEntity(missingPeopleId);
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
        searchHistoryService.getSearchHistoryBySearchId(searchHistoryId);
        return s3Service.upload(images, imagePath);
    }

    public List<S3DownloadResponseDto> downloadImagesFromS3(String imagePath, Long id, Long searchHistoryId) {
        this.getMissingPeopleById(id);
        searchHistoryService.getSearchHistoryBySearchId(searchHistoryId);
        return s3Service.download(imagePath);
    }

    //실종자 탐색단계 수정 todo : (필요에따라서) 탐색단계를 뒤로 못가게 해야함.
    @Transactional
    public StepDto changeStep(Step step, Long missingPeopleId) {
        MissingPeopleEntity missingPeople = getMissingPeopleEntity(missingPeopleId);
        try {
            missingPeople.setStep(step);
            missingPeopleRepository.save(missingPeople);
            return new StepDto(missingPeopleId, step);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }

    //실종자 탐색단계 가져오기
    public StepDto getStep(Long missingPeopleId, boolean police) {
        MissingPeopleEntity missingPeopleEntity = getMissingPeopleEntity(missingPeopleId);
        StepDto stepDto = StepDto.fromEntity(missingPeopleEntity);
        SearchHistoryEntity searchHistoryEntity = searchHistoryRepository.findFirstByMissingPeopleEntityIdAndStepOrderByCreatedAtAsc(missingPeopleId, stepDto.getStep());
        if (police && (stepDto.getStep().equals(Step.FIRST) || stepDto.getStep().equals(Step.SECOND))) {
            int count = cctvService.findCCTVsNearbyLocationWithinDistance(searchHistoryEntity.getLongitude(), searchHistoryEntity.getLatitude()).size();
            stepDto = new StepDetailDto(stepDto, String.format("CCTV %s개 탐색중", count));
        }

        return stepDto;
    }

    //프로필사진 경로 수정
    @Transactional
    public void setProfileImagePath(Long missingPeopleId, String imagePath) {
        MissingPeopleEntity missingPeopleEntity = getMissingPeopleEntity(missingPeopleId);
        missingPeopleEntity.setProfileImage(imagePath);
        missingPeopleRepository.save(missingPeopleEntity);
    }

    protected MissingPeopleEntity getMissingPeopleEntity(Long missingPeopleId) throws NoSuchElementException {
        return missingPeopleRepository.findById(missingPeopleId)
                .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + missingPeopleId));
    }

    @Transactional
    public void setQuerys(Long missingPeopleId, List<String> querys) {
        if (querys.size() < 2) {
            throw new IllegalArgumentException("querys list must contain at least 2 elements.");
        }

        MissingPeopleEntity missingPeopleEntity = getMissingPeopleEntity(missingPeopleId);
        missingPeopleEntity.setQuery(querys.get(0));
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
