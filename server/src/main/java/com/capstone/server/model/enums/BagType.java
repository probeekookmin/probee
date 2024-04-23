package com.capstone.server.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BagType {
    NONE("없음"),
    BACKPACK("백팩"),
    OTHERS("그 외");

    private final String kor;

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
