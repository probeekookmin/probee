package com.capstone.server.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class KafkaProducerService {

    @Value("${topic.name}")
    private String topicName;

    /* Kafka Template 을 이용해 Kafka Broker 전송 */

    private final KafkaTemplate<String,String> kafkaTemplate;

    public void sendMessageToKafka(String message) {
        System.out.printf("Producer Message : %s%n",message);
        this.kafkaTemplate.send(topicName, message);
    }
}