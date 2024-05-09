package com.capstone.server.dto.shortUrl;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShortUrlResponseDto {
    private String message;
    private Result result;
    private String code;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Result {
        private String hash;
        private String url;  // 여기에서 URL이 매핑됩니다.
        private String orgUrl;
    }

}