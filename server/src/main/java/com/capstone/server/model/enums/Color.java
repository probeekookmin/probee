package com.capstone.server.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Color {
    RED("빨강"),
    ORANGE("주황"),
    YELLOW("노랑"),
    GREEN("초록"),
    BLUE("파랑"),
    PURPLE("보라"),
    PINK("분홍"),
    GRAY("회색"),
    WHITE("흰색"),
    BROWN("갈색"),
    DARK_COLORED("어두운 색"),
    LIGHT_COLORED("밝은 색");

    private final String kor;
}
