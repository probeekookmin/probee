package com.capstone.server.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BodyType {
    SLIM("마름", "slim"),
    STANDARD("표준", "standard"),
    MUSCULAR("근육질", "muscular");

    private final String kor;
    private final String value;

    public static BodyType fromKor(String kor) {
        for (BodyType bodyType : BodyType.values()) {
            if (bodyType.getKor().equals(kor)) {
                return bodyType;
            }
        }
        throw new IllegalArgumentException("Invalid Korean BodyType: " + kor);
    }
}
