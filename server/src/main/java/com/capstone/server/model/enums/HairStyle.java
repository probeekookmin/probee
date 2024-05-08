package com.capstone.server.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum HairStyle {
    LONG_HAIR("긴 머리", "longHair"),
    SHORT_HAIR("짧은 머리", "shortHair");

    private final String kor;
    private final String value;

    public static HairStyle fromKor(String kor) {
        for (HairStyle hairStyle : HairStyle.values()) {
            if (hairStyle.getKor().equals(kor)) {
                return hairStyle;
            }
        }
        throw new IllegalArgumentException("Invalid Korean HairStyle: " + kor);
    }
}
