package com.capstone.server.dto;


import com.capstone.server.model.SearchResultEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class DetectionResultDto {
    long searchId;
    long missingPeopleId;
    String query; //영어쿼리
    String koQuery; //한국어 쿼리
    List<ImageData> data;

    @Data
    @AllArgsConstructor
    public static class ImageData {
        private String img_path;
        private Long cctvId;
        private double Similarity;
    }
    public SearchResultEntity toSearchResultEntity() {
        return SearchResultEntity.builder()
                .success(true)
                .build();
    }
}
