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

    @Value("${testTopic.name}")
    private String testTopicName;

    @Value("${startSearchingTopic.name}")
    private String startSearchingTopicName;

    @Value("${startSecondSearchingTopic.name}")
    private String startSecondSearchingTopicName;

    /* Kafka Template 을 이용해 Kafka Broker 전송 */
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final KafkaTemplate<String, KafkaDto> kafkaDtoTemplate;
    
    public void sendMessageToKafka(String message) {
        this.kafkaTemplate.send(testTopicName, message);
    }

    public void startSearchingToKafka(KafkaDto kafkaDto) {
        this.kafkaDtoTemplate.send(startSearchingTopicName, kafkaDto);
    }

    public void startSecondSearchingToKafka(KafkaDto kafkaDto) {
        this.kafkaDtoTemplate.send(startSecondSearchingTopicName, kafkaDto);
    }
}