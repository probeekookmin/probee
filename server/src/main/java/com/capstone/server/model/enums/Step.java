package com.capstone.server.model.enums;


import org.springframework.core.convert.converter.Converter;

import com.capstone.server.code.ErrorCode;
import com.capstone.server.exception.CustomException;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Arrays;

@Getter
@NoArgsConstructor
@AllArgsConstructor
//이미지 업로드에 쓰이는 단계 분류
public enum Step {
    FIRST("1차 탐색", "first"),
    BETWEEN("이미지 선별", "between"),
    SECOND("2차 탐색", "second"),
    EXIT("종료", "exit");

    private String kor;
    private String value;

    public static Step fromKor(String kor) {
        for (Step step : Step.values()) {
            if (step.getKor().equals(kor)) {
                return step;
            }
        }
        throw new CustomException(ErrorCode.BAD_REQUEST);
        // TODO : 에러 수정
    }

    public static Step getDefault() {
        return FIRST;
    }

    public static Step fromValue(String value) {
        return Arrays.stream(Step.values())
                    .filter(step -> step.value.equals(value.trim()))
                    .findFirst()
                    .orElseThrow(() -> new CustomException(ErrorCode.BAD_REQUEST));
                    // TODO : 에러 수정
    }
}