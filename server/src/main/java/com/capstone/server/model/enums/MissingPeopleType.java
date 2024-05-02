package com.capstone.server.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MissingPeopleType {
    CHILD("아동", "child"),
    INTELLECTUALLY_DISABLED("지적장애인", "disabled");

    private final String kor;
    private final String value;

    public static MissingPeopleType fromKor(String kor) {
        for (MissingPeopleType missingPeopleType : MissingPeopleType.values()) {
            if (missingPeopleType.getKor().equals(kor)) {
                return missingPeopleType;
            }
        }
        throw new IllegalArgumentException("Invalid Korean MissingPeopleType: " + kor);
    }
}
