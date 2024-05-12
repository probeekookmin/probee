package com.capstone.server.dto;

import com.capstone.server.model.SearchHistoryEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchRangeDto {
    private Long id;
    private double longitude;
    private double latitude;
    private int searchRadius;

    private SearchRangeDto(SearchHistoryEntity searchHistoryEntity) {
        this.id = searchHistoryEntity.getId();
        this.longitude = searchHistoryEntity.getLongitude();
        this.latitude = searchHistoryEntity.getLatitude();
        this.searchRadius = searchHistoryEntity.getSearchRadius();
    }

    public static SearchRangeDto fromEntity(SearchHistoryEntity searchHistoryEntity) {
        return new SearchRangeDto(searchHistoryEntity);
    }
}
