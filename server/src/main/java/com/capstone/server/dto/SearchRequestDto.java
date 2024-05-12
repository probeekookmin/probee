package com.capstone.server.dto;

import com.capstone.server.model.SearchHistoryEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchRequestDto {
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private double latitude;
    private double longitude;
    private String locationAddress;

    public SearchHistoryEntity toSearchHistoryEntity() {
        return SearchHistoryEntity.builder()
                .startTime(startTime)
                .endTime(endTime)
                .latitude(latitude)
                .longitude(longitude)
                .locationAddress(locationAddress)
                .build();
    }
}
