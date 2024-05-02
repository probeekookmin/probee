package com.capstone.server.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum StepDetail {
    // 경찰측 화면에서 보이는 진행 상태
    // 경찰측에서는 6단계로 보여줘야하기때문에 따로 필요할듯 Register
    //구조에따라서 정보등록 및 종료 단계는 필요없을지도
    //입력을 하게되면 무조건 정보등록은 완료, 나중에 탐색종료버튼이 있다면 status에 따라 가져올 수 있게하면 됨.
    REGISTER("정보 등록"),
    FIRST("1차 탐색"),
    BETWEEN("상호작용"), // TODO: 이름 수정
    SECOND("2차 탐색"),
    SEARCH("수색"),
    END("종료");

    private String kor;
}
