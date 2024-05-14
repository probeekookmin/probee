package com.capstone.server.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.capstone.server.dto.KafkaDto;
import com.capstone.server.dto.MissingPeopleCreateRequestDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class KafkaProducerService {

    @Value("${startCallFirstDetectApiTopic.name}")
    private String startCallFirstDetectApiTopicName;

    @Value("${startCallSecondDetectApiTopic.name}")
    private String startCallSecondDetectApiTopicName;

    /* Kafka Template 을 이용해 Kafka Broker 전송 */
    private final KafkaTemplate<String, String> kafkaStringTemplate;

    // Detection 하는 Producer
    public void startCallFirstDetectApiToKafka(String id) {
        this.kafkaStringTemplate.send(startCallFirstDetectApiTopicName, id);
    }

    public void startCallSecondDetectApiToKafka(String id) {
        this.kafkaStringTemplate.send(startCallSecondDetectApiTopicName, id);
    }
}