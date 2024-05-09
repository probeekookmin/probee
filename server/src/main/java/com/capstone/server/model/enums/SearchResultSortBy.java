package com.capstone.server.model.enums;

import com.capstone.server.code.ErrorCode;
import com.capstone.server.exception.CustomException;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum SearchResultSortBy {
    SIMILARITY("similarity", "similarity"),
    LATEST("latest", "time");
    private final String value;
    private final String sortBy;

    public static SearchResultSortBy fromValue(String value) {
        return Arrays.stream(SearchResultSortBy.values())
                .filter(sortBy -> sortBy.value.equals(value.trim()))
                .findFirst()
                .orElseThrow(() -> new CustomException(ErrorCode.BAD_REQUEST, "sort type error", "wrong sort type"));
    }
}
