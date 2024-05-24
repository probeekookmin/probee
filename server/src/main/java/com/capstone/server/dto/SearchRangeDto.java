package com.capstone.server.dto;

import com.capstone.server.model.SearchHistoryEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchRangeDto {
    private double longitude;
    private double latitude;
    private Double searchRadius;

    private SearchRangeDto(SearchHistoryEntity searchHistoryEntity) {
        this.longitude = searchHistoryEntity.getLongitude();
        this.latitude = searchHistoryEntity.getLatitude();
        this.searchRadius = searchHistoryEntity.getSearchRadius();
    }

    public static SearchRangeDto fromEntity(SearchHistoryEntity searchHistoryEntity) {
        return new SearchRangeDto(searchHistoryEntity);
    }
}
