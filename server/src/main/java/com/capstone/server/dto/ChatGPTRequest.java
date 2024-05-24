package com.capstone.server.dto;

import lombok.Data;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@Getter
public class ChatGPTRequest {
    private String model;
    private List<Message> messages;

    @JsonProperty("presence_penalty")
    private double presencePenalty = 0.9;

    @JsonProperty("temperature")
    private double temperature = 0.3;

    @JsonProperty("frequency_penalty")
    private double frequencyPenalty = -1;

    public ChatGPTRequest(String model, String prompt, String role) { // String role
        this.model = model;
        this.messages =  new ArrayList<>();
        this.messages.add(new Message(role, prompt));
    }

    public void addMessages(String prompt, String role) {
        this.messages.add(new Message(role, prompt));
    }
}