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
    String location; //탐색 장소 todo : 추후 장소 선정 알고리즘에 따라 변경
    String cctvId; //cctv 고유번호
    String startTime; //탐색 시작시간
    String endTime; //탐색 종료시간
    Long searchId; //탐색 고유번호
    String query; //탐색 쿼리

}
