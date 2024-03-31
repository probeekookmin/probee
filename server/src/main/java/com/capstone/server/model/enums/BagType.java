package com.capstone.server.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BagType {
    NONE("없음"),
    BACKPACK("백팩"),
    HANDBAG("핸드백"),
    OTHERS("그 외");

    private final String kor;
}
