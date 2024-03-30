package com.capstone.server.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum SearchStatus {
    // 경찰측 화면에서 보이는 진행 상태
    REGISTER("정보 등록"),
    FIRST_STEP("1차 탐색"),
    INTERACTION("티키타가"), // TODO: 이름 수정
    SECOND_STEP( "2차 탐색"),
    SEARCH("수색"),
    END("종료");

    private String kor;
}
