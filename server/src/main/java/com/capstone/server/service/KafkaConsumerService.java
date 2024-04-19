package com.capstone.server.service;

import java.io.IOException;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class KafkaConsumerService {

    @KafkaListener(topics = "test-topic", groupId = "consumer_group01") // return 하지 않음. 
    public void consume(String message) throws IOException {
        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        System.out.printf("Consumed Message : %s%n", message);
    }
}