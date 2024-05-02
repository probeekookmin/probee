package com.capstone.server.response;

import java.time.LocalDateTime;
import java.util.Map;

import com.capstone.server.code.ErrorCode;

import lombok.Getter;

@Getter
public class ErrorResponse {
    private final LocalDateTime timestamp = LocalDateTime.now();
    private final int statusCode;
    private final String error;
    private final String message;
    private Map<String, String> errorDetails;

    public ErrorResponse(ErrorCode errorCode) {
        this.statusCode = errorCode.getHttpStatus().value();
        this.error = errorCode.getHttpStatus().name();
        this.message = errorCode.getMessage();
        this.errorDetails = null;
    }

    public ErrorResponse(ErrorCode errorCode, Map<String, String> errorDetails) {
        this.statusCode = errorCode.getHttpStatus().value();
        this.error = errorCode.getHttpStatus().name();
        this.message = errorCode.getMessage();
        this.errorDetails = errorDetails;
    }
}