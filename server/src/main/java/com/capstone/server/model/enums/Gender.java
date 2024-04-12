package com.capstone.server.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public enum Gender {
    MAN("성인 남성"),
    WOMAN("성인 여성"),
    BOY("남자아이"),
    GIRL("여자아이");

    private String kor;

    public static Gender fromKor(String kor) {
        for (Gender gender : Gender.values()) {
            if (gender.getKor().equals(kor)) {
                return gender;
            }
        }
        throw new IllegalArgumentException("Invalid Korean Gender: " + kor);
    }
}
