package com.capstone.server.dto;

import com.capstone.server.model.SearchHistoryEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchHistoryDto {
    private Long id;
    private double longitude;
    private double latitude;

    private SearchHistoryDto(SearchHistoryEntity searchHistoryEntity) {
        this.id = searchHistoryEntity.getId();
        this.longitude = searchHistoryEntity.getLongitude();
        this.latitude = searchHistoryEntity.getLatitude();
    }

    public static SearchHistoryDto fromEntity(SearchHistoryEntity searchHistoryEntity) {
        return new SearchHistoryDto(searchHistoryEntity);
    }
}
