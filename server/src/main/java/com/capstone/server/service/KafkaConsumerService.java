package com.capstone.server.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capstone.server.dto.CCTVDto;
import com.capstone.server.dto.DetectionResultDto;
import com.capstone.server.dto.KafkaDto;
import com.capstone.server.dto.MissingPeopleCreateRequestDto;
import com.capstone.server.dto.SearchHistoryDto;
import com.capstone.server.model.enums.Status;
import com.capstone.server.model.enums.Step;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class KafkaConsumerService {

    @Autowired
    private CCTVService cctvService;
    @Autowired
    private MissingPeopleService missingPeopleService;
    @Autowired
    private SearchHistoryService searchHistoryService;
    @Autowired
    private DetectService detectService;
    
    @Value("${startSearchingTopic.name}")
    private String startSearchingTopicName;

    @Value("${startSecondSearchingTopic.name}")
    private String startSecondSearchingTopicName;

    // 현재 사용 x, 추후 수정
    @Transactional
    @KafkaListener(topics = "start-searching", groupId = "consumer_group01") // return 하지 않음. 
    public void consumeStartSearching(KafkaDto kafkaDto) {
        List<CCTVDto> cctvDtos = cctvService.findCCTVsNearbyLocationWithinDistance(
            kafkaDto.getLongitude(), kafkaDto.getLatitude());

        // POLICY : 상태 업데이트는 해당 로직 시작 전 수행
        missingPeopleService.modifyStatus(kafkaDto.getMissingPeopleId(), Status.SEARCHING);
        searchHistoryService.modifyStep(kafkaDto.getSearchHistoryId(), Step.FIRST);

        // TODO : 쿼리 생성 + AI 서버 요청
    }

    // 현재 사용 x, 추후 수정
    @Transactional
    @KafkaListener(topics = "start-second-searching", groupId = "consumer_group02") // return 하지 않음. 
    public void consumeStartSecondSearching(KafkaDto kafkaDto) {
        searchHistoryService.modifyStep(kafkaDto.getSearchHistoryId(), Step.SECOND);

        // TODO : 2차 모델 연산 시작 요청

        missingPeopleService.modifyStatus(kafkaDto.getMissingPeopleId(), Status.EXIT);
        searchHistoryService.modifyStep(kafkaDto.getSearchHistoryId(), Step.EXIT);

    }

    // 사용 중 
    @Transactional
    @KafkaListener(topics = "start-call-first-detection-api", groupId = "consumer_group01") // return 하지 않음. 
    public void consumeStartCallFirstDetectionApi(Long id) {
        // TODO : 로직 추가 
        DetectionResultDto detectionResultDto = detectService.callFirstDetectAPI(id);
        detectService.postFirstDetectionResult(detectionResultDto);
    }
}