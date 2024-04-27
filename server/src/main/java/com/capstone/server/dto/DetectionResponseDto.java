package com.capstone.server.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class DetectionResponseDto {
    String query; //영어쿼리
    String ko_query; //한국어 쿼리
    List<ImageData> data;

    @Data
    @AllArgsConstructor
    public static class ImageData {
        private String img_path;
        private double Similarity;
    }
}
