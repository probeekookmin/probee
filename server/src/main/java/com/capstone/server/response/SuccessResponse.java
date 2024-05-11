package com.capstone.server.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

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