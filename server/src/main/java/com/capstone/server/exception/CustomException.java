package com.capstone.server.exception;

import java.util.HashMap;
import java.util.Map;

import com.capstone.server.code.ErrorCode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class CustomException extends RuntimeException {
    private final ErrorCode errorCode;
    private Map<String, String> errorDetails;
    private Exception errorException;

    public CustomException(ErrorCode errorCode, Map<String, String> errorDetails) {
        this.errorCode = errorCode;
        this.errorDetails = errorDetails;
    }

    public CustomException(ErrorCode errorCode, Exception errorException) {
        this.errorCode = errorCode;
        this.errorDetails = new HashMap<>();
        String[] parts = errorException.getMessage().split(":");
        String key = parts[0].trim();
        String value = parts[0].trim();
        this.errorDetails.put(key, value);
    }
}