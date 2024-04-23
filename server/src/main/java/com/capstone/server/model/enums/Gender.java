package com.capstone.server.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public enum Gender {
    MAN("성인 남성", "man"),
    WOMAN("성인 여성", "woman"),
    BOY("남자아이", "boy"),
    GIRL("여자아이", "girl");

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
