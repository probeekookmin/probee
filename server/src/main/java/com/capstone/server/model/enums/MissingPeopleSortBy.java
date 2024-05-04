package com.capstone.server.model.enums;

import com.capstone.server.code.ErrorCode;
import com.capstone.server.exception.CustomException;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum MissingPeopleSortBy {
    CREATED_AT("createdAt");
    // TODO : 정렬 속성 추가 

    private String value;

    public static MissingPeopleSortBy fromValue(String value) {
        return Arrays.stream(MissingPeopleSortBy.values())
                .filter(sortBy -> sortBy.value.equals(value.trim()))
                .findFirst()
                .orElseThrow(() -> new CustomException(ErrorCode.BAD_REQUEST, "Sort value Error", "Wrong sort Value"));
    }
}
