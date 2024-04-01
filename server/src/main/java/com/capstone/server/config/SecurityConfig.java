package com.capstone.server.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfig  {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOrigin("http://localhost:3000"); // 다른 도메인들 허용
        configuration.addAllowedOrigin("https://capstone-2023-11.vercel.app/"); // 다른 도메인들 허용
        configuration.addAllowedHeader("*"); // 허용하는 request header 추가
        configuration.addAllowedMethod("*"); // GET POST PUT DELETE 메서드 허용
        configuration.addExposedHeader("*"); // 노출할 response header 추가
        configuration.setAllowCredentials(true); // json 자바스크립트 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",configuration);
        return source;
    }
}