package com.capstone.server.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
@ToString
public class SearchResultDetailResponse<T> extends SearchResultResponse<T> {
    private SearchRangeDto searchRange;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    public SearchResultDetailResponse(long count, List<T> list, SearchRangeDto searchRangeDto, LocalDateTime startTime, LocalDateTime endTime) {
        super(count, list);
        searchRange = searchRangeDto;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
