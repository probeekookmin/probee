package com.capstone.server.service;

import com.capstone.server.dto.KafkaDto;
import com.capstone.server.dto.detection.FirstDetectionDataDto;
import com.capstone.server.dto.guardian.BetweenRequestDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Autowired
    private KafkaProducerService kafkaProducerService;

    // 사용 중 
    @Transactional
    @KafkaListener(topics = "start-call-first-detection-api", groupId = "consumer_group01", containerFactory = "kafkaLongListenerContainerFactory")
    public void consumeStartCallFirstDetectionApi(Long id) {
        System.out.println("************** Consumer01 FIRST Start *************");
        FirstDetectionDataDto firstDetectionDataDto = detectService.callFirstDetectAPI(id); 
        System.out.println("************** Consumer01 SECOND Start *************");
        detectService.postFirstDetectionResult(firstDetectionDataDto);
        System.out.println("************** Consumer01 THIRD Start *************");
    }

    // TODO : 2차 모델 로직 추가 
    @Transactional
    @KafkaListener(topics = "start-call-second-detection-api", groupId = "consumer_group02",  containerFactory = "kafkaJsonListenerContainerFactory")
    public void consumeStartCallSecondDetectionApi(KafkaDto kafkaDto) {
        System.out.println("************** Consumer02 FIRST Start *************");
        FirstDetectionDataDto firstDetectionDataDto = detectService.callSecondDetectApi(kafkaDto.getId(), kafkaDto.getBetweenRequestDto(), kafkaDto.getSearchId());
        System.out.println("************** Consumer02 SECOND Start *************");
        detectService.postSecondDetectionResult(firstDetectionDataDto);
        System.out.println("************** Consumer02 THIRD Start *************");
    }
}