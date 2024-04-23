package com.capstone.server.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BottomType {
    SHORT_PANTS("반바지", "shortPants"),
    LONG_PANTS("긴바지", "longPants"),
    SKIRT("치마", "skirt");

    private final String kor;
    private final String value;

    public static BottomType fromKor(String kor) {
        for (BottomType bottomType : BottomType.values()) {
            if (bottomType.getKor().equals(kor)) {
                return bottomType;
            }
        }
        throw new IllegalArgumentException("Invalid Korean BottomType: " + kor);
    }
}
