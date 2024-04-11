package com.capstone.server.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
@RequiredArgsConstructor
public enum TopType {
    SHORT_SLEEVE("반팔"),
    LONG_SLEEVE("긴팔");

    private final String kor;

    public static TopType fromKor(String kor) {
        for (TopType topType : TopType.values()) {
            if (topType.getKor().equals(kor)) {
                return topType;
            }
        }
        throw new IllegalArgumentException("Invalid Korean TopType: " + kor);
    }
}
