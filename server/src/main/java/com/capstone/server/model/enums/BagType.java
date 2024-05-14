package com.capstone.server.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BagType {
    NONE("없음", "none"),
    BACKPACK("백팩", "backpack"),
    BAG("그 외", "bag");

    private final String kor;
    private final String value;

    public static BagType fromKor(String kor) {
        for (BagType bagType : BagType.values()) {
            if (bagType.getKor().equals(kor)) {
                return bagType;
            }
        }
        // TODO : 
        throw new IllegalArgumentException("Invalid Korean BagType: " + kor);
    }
}
