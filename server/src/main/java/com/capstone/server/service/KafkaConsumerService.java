package com.capstone.server.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capstone.server.dto.CctvDto;
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
    private CctvService cctvService;
    @Autowired
    private MissingPeopleService missingPeopleService;
    @Autowired
    private SearchHistoryService searchHistoryService;

    @Transactional
    @KafkaListener(topics = "start-searching", groupId = "consumer_group01") // return 하지 않음. 
    public void consumeStartSearching(KafkaDto kafkaDto) {
        List<CctvDto> cctvDtos = cctvService.findCctvsNearbyLocationWithinDistance(
            kafkaDto.getLongitude(), kafkaDto.getLatitude());

        // TODO : 쿼리 생성 + AI 서버 요청

        missingPeopleService.modifyStatus(kafkaDto.getMissingPeopleId(), Status.SEARCHING);
        searchHistoryService.modifyStep(kafkaDto.getSearchHistoryId(), Step.FIRST);
    }
}