package com.capstone.server.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum HairStyle {
    LONG_HAIR("긴 머리"),
    SHORT_HAIR("짧은 머리"),
    PONYTAIL("포니테일");

    private final String kor;
}
