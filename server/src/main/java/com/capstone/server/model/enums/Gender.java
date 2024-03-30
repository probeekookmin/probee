package com.capstone.server.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public enum Gender {
    MALE("남성"),
    FEMALE("여성"),
    OTHER("그 외");

    private String kor;
}
