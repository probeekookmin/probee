package com.capstone.server.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BottomType {
    SHORT_PANTS("반바지"),
    LONG_PANTS("긴바지"),
    SKIRT("치마");

    private final String kor;
}
