package com.capstone.server.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Color {
    RED("빨강", "red"),
    ORANGE("주황", "orange"),
    YELLOW("노랑", "yellow"),
    GREEN("초록", "green"),
    BLUE("파랑", "blue"),
    PINK("분홍", "pink"),
    GRAY("회색", "gray"),
    WHITE("흰색", "white"),
    BROWN("갈색", "brown"),
    DARK_COLORED("어두운 색", "darkColored"),
    LIGHT_COLORED("밝은 색", "lightColored");

    private final String kor;
    private final String value;

    public static Color fromKor(String kor) {
        for (Color color : Color.values()) {
            if (color.getKor().equals(kor)) {
                return color;
            }
        }
        throw new IllegalArgumentException("Invalid Korean Color: " + kor);
    }
}
