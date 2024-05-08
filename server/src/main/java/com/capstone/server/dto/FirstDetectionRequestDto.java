package com.capstone.server.dto;

import com.capstone.server.model.MissingPeopleEntity;
import com.capstone.server.model.SearchHistoryEntity;
import com.capstone.server.model.enums.Step;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FirstDetectionRequestDto {
    List<CCTVDto> cctvId; //CCTV 고유번호 탐색위치, 거리에따라 CCTV id를 지정해 보낼 예정
    String startTime; //탐색 시작시간
    String endTime; //탐색 종료시간
    Long searchId; //탐색 고유번호 //backend server에 결과 넣을 때 사용
    Long missingPeopleId; //backend server에 결과 넣을 때 사용
    Step step; //백엔드 서버에서 s3업로드 시 사용
    String query; //쿼리가 존재하면 백엔드 서버에서 쿼리생성 연산을 따로 하지않음. 쿼리를 넣어보내면 한국어 쿼리는 도착안함

    public FirstDetectionRequestDto(MissingPeopleEntity missingPeopleEntity, SearchHistoryEntity searchHistoryEntity) {
        //todo refectoring
        this.startTime = String.valueOf(searchHistoryEntity.getStartTime());
        this.endTime = String.valueOf(searchHistoryEntity.getEndTime());
        this.searchId = searchHistoryEntity.getId();
        this.step = searchHistoryEntity.getStep();
        this.query = missingPeopleEntity.getQuery();
        this.missingPeopleId = missingPeopleEntity.getId();
        this.step = Step.fromValue("first");
    }


    public static FirstDetectionRequestDto fromEntity(MissingPeopleEntity missingPeopleEntity, SearchHistoryEntity searchHistoryEntity) {
        return new FirstDetectionRequestDto(missingPeopleEntity, searchHistoryEntity);
    }
}
