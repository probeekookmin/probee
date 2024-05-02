package com.capstone.server.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Gender {
    MAN("남성", "man"),
    WOMAN("여성", "woman");

    private final String kor;
    private final String value;

    public static Gender fromKor(String kor) {
        for (Gender gender : Gender.values()) {
            if (gender.getKor().equals(kor)) {
                return gender;
            }
        }
        throw new IllegalArgumentException("Invalid Korean Gender: " + kor);
    }
}
