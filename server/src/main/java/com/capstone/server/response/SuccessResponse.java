package com.capstone.server.response;

import java.time.LocalDateTime;

import org.springframework.http.HttpHeaders;

import com.capstone.server.model.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class SuccessResponse<T> {
    
    private final LocalDateTime timestamp = LocalDateTime.now();
    private int statusCode = 200;
    private boolean success = true;
    private T data = null;
    
    public SuccessResponse(T data) {
        this.data = data;
    }
}