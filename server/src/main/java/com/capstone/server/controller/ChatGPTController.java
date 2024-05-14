package com.capstone.server.controller;

import com.capstone.server.dto.ChatGPTRequest;
import com.capstone.server.dto.ChatGPTResponse;
import com.capstone.server.service.ChatGPTService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/bot")
public class ChatGPTController {

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiURL;

    @Autowired
    private RestTemplate template;
    @Autowired
    private ChatGPTService chatGPTService;

    @GetMapping("/chat")
    public String chat(@RequestParam(name = "prompt")String prompt){
        String response = chatGPTService.translateEnglishToKorean();
        return response;
    }
}