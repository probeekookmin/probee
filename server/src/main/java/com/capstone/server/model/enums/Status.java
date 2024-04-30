package com.capstone.server.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
//사용자 측에 보이는 단계?
public enum Status {
    FIRST_STEP("1차 탐색"),
    IMAGE_SELECTING("탐색 이미지 선별"),
    SECOND_STEP("탐색 이미지 선별"),
    SEARCH("실종자 수색");

    private String kor;
}
