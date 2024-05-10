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

    @Value("${startCallFirstDetectApiTopic.name}")
    private String startCallFirstDetectApiTopicName;

    /* Kafka Template 을 이용해 Kafka Broker 전송 */
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final KafkaTemplate<String, KafkaDto> kafkaDtoTemplate;
    private final KafkaTemplate<String, Long> kafkaLongTemplate;
    
    // 현재 사용 x, 추후 수정
    public void sendMessageToKafka(String message) {
        this.kafkaTemplate.send(testTopicName, message);
    }
    // 현재 사용 x, 추후 수정   
    public void startSearchingToKafka(KafkaDto kafkaDto) {
        this.kafkaDtoTemplate.send(startSearchingTopicName, kafkaDto);
    }

    // 현재 사용 x, 추후 수정
    public void startSecondSearchingToKafka(KafkaDto kafkaDto) {
        this.kafkaDtoTemplate.send(startSecondSearchingTopicName, kafkaDto);
    }

    // Detection 하는 Producer
    public void startCallFirstDetectApiToKafka(Long id) {
        this.kafkaLongTemplate.send(startCallFirstDetectApiTopicName, id);
    }
}