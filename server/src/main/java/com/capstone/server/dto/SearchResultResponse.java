package com.capstone.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class SearchResultResponse<T> {
    private long count;
    private List<T> list;

    public SearchResultResponse() {
        this.count = 0;
        this.list = new ArrayList<>();
    }
}
