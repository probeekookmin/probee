package com.capstone.server.dto;


import com.capstone.server.model.SearchHistoryEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class SearchHistoryListDto {
    private Long searchId;
    private LocalDateTime createdAt;

    public SearchHistoryListDto(SearchHistoryEntity searchHistory) {
        this.searchId = searchHistory.getId();
        this.createdAt = searchHistory.getCreatedAt();
    }

    public static SearchHistoryListDto fromEntity(SearchHistoryEntity searchHistory) {
        return new SearchHistoryListDto(searchHistory);
    }
}
