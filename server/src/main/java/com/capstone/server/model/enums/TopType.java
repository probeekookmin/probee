package com.capstone.server.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
@RequiredArgsConstructor
public enum TopType {
    NONE("없음", "none"),
    SHORT_SLEEVE("반팔", "short sleeve"),
    LONG_SLEEVE("긴팔", "long sleeve"),
    COAT("코트", "coat"),
    WINTER_COAT("패딩", "winter coat");

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
