package com.capstone.server.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
@RequiredArgsConstructor
public enum TopType {
    SHORT_SLEEVE("반팔"),
    LONG_SLEEVE("긴팔"),
    COAT("코트"),
    PADDING("패딩");

    private final String kor;
}
