package com.capstone.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capstone.server.dto.CCTVDto;
import com.capstone.server.dto.DetectionDataDto;
import com.capstone.server.dto.KafkaDto;
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

    // 사용 중 
    @Transactional
    @KafkaListener(topics = "start-call-first-detection-api", groupId = "consumer_group01") // return 하지 않음. 
    public void consumeStartCallFirstDetectionApi(String id) {
        // TODO : 로직 추가 
        Long idValue = Long.valueOf(id);
        DetectionDataDto detectionDataDto = detectService.callFirstDetectAPI(idValue);
        detectService.postFirstDetectionResult(detectionDataDto);
    }
}