package com.capstone.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.server.service.KafkaProducerService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/kafka")
@RestController
public class KafkaProducerController {

    @Autowired
    private final KafkaProducerService kafkaProducerService;

    @PostMapping
    public ResponseEntity<?> sendMassage(
            @RequestParam String message) {
        this.kafkaProducerService.sendMessageToKafka(message);
        return ResponseEntity.ok().body("Good");
    }
}