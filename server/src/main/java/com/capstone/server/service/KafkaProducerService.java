package com.capstone.server.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.capstone.server.dto.KafkaDto;

@Slf4j
@RequiredArgsConstructor
@Service
public class KafkaProducerService {

    @Value("${startCallFirstDetectApiTopic.name}")
    private String startCallFirstDetectApiTopicName;

    @Value("${startCallSecondDetectApiTopic.name}")
    private String startCallSecondDetectApiTopicName;

    /* Kafka Template 을 이용해 Kafka Broker 전송 */
    private final KafkaTemplate<String, Long> kafkaLongTemplate;
    private final KafkaTemplate<String, KafkaDto> kafkaDtoTemplate;

    // Detection 하는 Producer.
    public void startCallFirstDetectApiToKafka(Long id) {
        System.out.println("************** PRODUCER 01 Start *************");
        this.kafkaLongTemplate.send(startCallFirstDetectApiTopicName, id);
        System.out.println("************** PRODUCER 01 EXIT *************");
    }

    public void startCallSecondDetectApiToKafka(KafkaDto kafkaDto) {
        this.kafkaDtoTemplate.send(startCallSecondDetectApiTopicName, kafkaDto);
    }
}