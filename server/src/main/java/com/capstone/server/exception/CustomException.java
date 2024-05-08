package com.capstone.server.exception;

import com.capstone.server.code.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

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

    public CustomException(ErrorCode errorCode, String errorDetailKey, String errorDetailValue) {
        this.errorCode = errorCode;
        Map<String, String> map = new HashMap<>();
        map.put(errorDetailKey, errorDetailValue);
        errorDetails = map;
    }

    public CustomException(ErrorCode errorCode, Exception errorException) {
        this.errorCode = errorCode;
        this.errorDetails = new HashMap<>();
        String[] parts = errorException.getMessage().split(":");

        String key = parts[0].trim();
        String value = parts[0].trim();
        for (String s : parts) {
            System.err.println(s);
        }
        try {
            if (parts[1] != null) {
                value = parts[1].trim();
            }
        } catch (Exception e) {
            System.out.println(e);
        }


        this.errorDetails.put(key, value);
    }
}