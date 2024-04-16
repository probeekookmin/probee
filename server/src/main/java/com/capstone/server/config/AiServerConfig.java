package com.capstone.server.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
@RequiredArgsConstructor

public class AiServerConfig {
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
