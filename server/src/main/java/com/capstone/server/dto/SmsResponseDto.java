package com.capstone.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SmsResponseDto {
    DataType data;
    ApiType api;
    Object result; // 에러 시 에러 이유가 나옴

    @AllArgsConstructor
    @Data
    public static class DataType {
        private String result;
        private String form;
        private String to;
        private String origin_text;
        private int success;

    }

    @AllArgsConstructor
    @Data
    public static class ApiType {
        boolean success;
        int cost;
        int ms;
        int pl_id;
    }
}
