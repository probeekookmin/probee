package com.capstone.server.model.enums;

import lombok.Getter;

@Getter

public enum Color {
    NONE("없음", "none"),
    RED("빨강", "red"),
    ORANGE("주황", "orange"),
    YELLOW("노랑", "yellow"),
    GREEN("초록", "green"),
    KHAKI("카키색", "khaki"),
    LIGHT_BLUE("하늘", "light blue"),
    BLUE("파랑", "blue"),
    DARK_BLUE("남색", "dark blue"),
    PURPlE("보라", "purple"),
    PINK("분홍", "pink"),
    MAROON("자주색", "maroon"),
    WHITE("흰색", "white"),
    BEIGE("베이지", "beige"),
    BLACK("검정", "black"),
    BROWN("갈색", "brown");

    private final String kor;
    private final String value;

    Color(String kor, String value) {
        this.kor = kor;
        this.value = value;
    }

    public static Color fromKor(String kor) {
        for (Color color : Color.values()) {
            if (color.getKor().equals(kor)) {
                return color;
            }
        }
        throw new IllegalArgumentException("Invalid Korean Color: " + kor);
    }
}
