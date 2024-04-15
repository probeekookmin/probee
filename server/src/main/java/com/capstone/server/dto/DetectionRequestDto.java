package com.capstone.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DetectionRequestDto {
    String cctvId; //cctv 고유번호 탐색위치, 거리에따라 cctv id를 지정해 보낼 예정
    String startTime; //탐색 시작시간
    String endTime; //탐색 종료시간
    Long searchId; //탐색 고유번호
    String query; //탐색 쿼리

}
