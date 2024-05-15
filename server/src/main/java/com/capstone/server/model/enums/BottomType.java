package com.capstone.server.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BottomType {
    NONE("없음", "none"),
    SHORT_PANTS("반바지", "short pants"),
    LONG_PANTS("긴바지", "long pants"),
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
