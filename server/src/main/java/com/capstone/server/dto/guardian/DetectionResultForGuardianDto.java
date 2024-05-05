package com.capstone.server.dto.guardian;


import com.capstone.server.model.SearchResultEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DetectionResultForGuardianDto {
    private Long resultId;
    private String imgUrl;

    public static DetectionResultForGuardianDto fromEntity(SearchResultEntity searchResultEntity) {
        return new DetectionResultForGuardianDto(searchResultEntity.getId(), searchResultEntity.getImageUrl());
    }
}
