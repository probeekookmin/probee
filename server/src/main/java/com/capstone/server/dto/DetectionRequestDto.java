package com.capstone.server.dto;

import com.capstone.server.model.MissingPeopleDetailEntity;
import com.capstone.server.model.MissingPeopleEntity;
import com.capstone.server.model.SearchHistoryEntity;
import com.capstone.server.model.enums.Step;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DetectionRequestDto {
    String cctvId; //CCTV 고유번호 탐색위치, 거리에따라 CCTV id를 지정해 보낼 예정
    String startTime; //탐색 시작시간
    String endTime; //탐색 종료시간
    Long searchId; //탐색 고유번호 //backend server에 결과 넣을 때 사용
    Long missingPeopleId; //backend server에 결과 넣을 때 사용
    ClothesInfo clothesInfo;
    Step step; //백엔드 서버에서 s3업로드 시 사용
    String query; //쿼리가 존재하면 백엔드 서버에서 쿼리생성 연산을 따로 하지않음. 쿼리를 넣어보내면 한국어 쿼리는 도착안함

    @Getter
    @Setter
    public static class ClothesInfo {
        String gender;
        LocalDate birthdate;
        String hairStyle;
        String topColor;
        String topType;
        String bottomColor;
        String bottomType;
        String bagType;
    }

    public DetectionRequestDto(MissingPeopleEntity missingPeopleEntity) {
        this.cctvId = "C0006"; //todo : cctv id 선정 로직 추가
        //todo refectoring
        SearchHistoryEntity history = missingPeopleEntity.getSearchHistoryEntities().get(missingPeopleEntity.getSearchHistoryEntities().size() - 1);
        this.startTime = String.valueOf(history.getStartTime());
        this.endTime = String.valueOf(history.getEndTime());
        this.searchId = history.getId();
        this.step = history.getStep();
        this.query = missingPeopleEntity.getQuery();
        this.missingPeopleId = missingPeopleEntity.getId();

        MissingPeopleDetailEntity missingPeopleDetailEntity = missingPeopleEntity.getMissingPeopleDetailEntity();
        this.clothesInfo = new ClothesInfo();
        this.clothesInfo.setGender(String.valueOf(missingPeopleEntity.getGender()));
        this.clothesInfo.setBirthdate(missingPeopleEntity.getBirthdate());
        this.clothesInfo.setHairStyle(String.valueOf(missingPeopleDetailEntity.getHairStyle()));
        this.clothesInfo.setTopColor(String.valueOf(missingPeopleDetailEntity.getTopColor()));
        this.clothesInfo.setTopType(String.valueOf(missingPeopleDetailEntity.getTopType()));
        this.clothesInfo.setBottomColor(String.valueOf(missingPeopleDetailEntity.getBottomColor()));
        this.clothesInfo.setBottomType(String.valueOf(missingPeopleDetailEntity.getBottomType()));
        this.clothesInfo.setBagType(String.valueOf(missingPeopleDetailEntity.getBagType()));
    }


    public static DetectionRequestDto fromEntity(MissingPeopleEntity missingPeopleEntity) {
        return new DetectionRequestDto(missingPeopleEntity);
    }
}
