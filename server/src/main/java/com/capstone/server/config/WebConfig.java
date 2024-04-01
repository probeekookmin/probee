package com.capstone.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
            .addMapping("/**")
            .allowedHeaders("*")
            .allowedOrigins("http://localhost:3000", "https://probee.co.kr", "http://probee.co.kr") // TODO: url 수정
            .allowedMethods("*");
    }
}