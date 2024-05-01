package com.capstone.server.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
@RequiredArgsConstructor
public enum TopType {
    SHORT_SLEEVE("반팔", "shortSleeve"),
    LONG_SLEEVE("긴팔", "longSleeve");

    private final String kor;
    private final String value;

    public static TopType fromKor(String kor) {
        for (TopType topType : TopType.values()) {
            if (topType.getKor().equals(kor)) {
                return topType;
            }
        }
        throw new IllegalArgumentException("Invalid Korean TopType: " + kor);
    }
}
