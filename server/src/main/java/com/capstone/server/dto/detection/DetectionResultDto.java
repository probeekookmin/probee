package com.capstone.server.dto.detection;


import com.capstone.server.model.SearchResultEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DetectionResultDto {
    private Long resultId;
    private String imgUrl;

    public static DetectionResultDto fromEntity(SearchResultEntity searchResultEntity) {
        return new DetectionResultDto(searchResultEntity.getId(), searchResultEntity.getImageUrl());
    }
}
