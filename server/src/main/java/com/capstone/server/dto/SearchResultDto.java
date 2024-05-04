package com.capstone.server.dto;

import com.capstone.server.model.SearchResultEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class SearchResultDto {
    private double similarity;
    private String imgUrl;
    private LocalDateTime time;

    public SearchResultDto(SearchResultEntity searchResultEntity) {
        this.similarity = searchResultEntity.getSimilarity();
        this.imgUrl = searchResultEntity.getImageUrl();
        this.time = searchResultEntity.getTime();
    }

    public static SearchResultDto fromEntity(SearchResultEntity searchResultEntity) {
        return new SearchResultDto(searchResultEntity);
    }
}
