package com.capstone.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class SearchResultResponse<T> {
    private long count;
    private List<T> list;
}
