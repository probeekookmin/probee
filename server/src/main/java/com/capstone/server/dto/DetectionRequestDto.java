package com.capstone.server.dto;

import com.capstone.server.model.MissingPeopleEntity;
import com.capstone.server.model.SearchHistoryEntity;
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
    String cctvId; //cctv 고유번호 탐색위치, 거리에따라 cctv id를 지정해 보낼 예정
    String startTime; //탐색 시작시간
    String endTime; //탐색 종료시간
    Long searchId; //탐색 고유번호
    Long missingPeopleId;
    ClothesInfo clothesInfo;

    @Getter
    @Setter
    public static class ClothesInfo{
        String gender;
        LocalDate birthdate;
        String hairStyle;
        String topColor;
        String topType;
        String bottomColor;
        String bottomType;
        String bagType;
    }
    public DetectionRequestDto(MissingPeopleEntity missingPeopleEntity){
        this.cctvId = "C0305-12_고2"; //todo : cctv id 선정 로직 추가
        SearchHistoryEntity history = missingPeopleEntity.getSearchHistoryEntities().get(missingPeopleEntity.getSearchHistoryEntities().size()-1);
        this.startTime = String.valueOf(history.getStartTime());
        this.endTime = String.valueOf(history.getEndTime());
        this.searchId = history.getId();

        this.missingPeopleId = missingPeopleEntity.getId();

        this.clothesInfo = new ClothesInfo();
        this.clothesInfo.setGender(String.valueOf(missingPeopleEntity.getGender()));
        this.clothesInfo.setBirthdate(missingPeopleEntity.getBirthdate());
        this.clothesInfo.setHairStyle(String.valueOf(missingPeopleEntity.getMissingPeopleDetailEntity().getHairStyle()));
        this.clothesInfo.setTopColor(String.valueOf(missingPeopleEntity.getMissingPeopleDetailEntity().getTopColor()));
        this.clothesInfo.setTopType(String.valueOf(missingPeopleEntity.getMissingPeopleDetailEntity().getTopType()));
        this.clothesInfo.setBottomColor(String.valueOf(missingPeopleEntity.getMissingPeopleDetailEntity().getBottomColor()));
        this.clothesInfo.setBottomType(String.valueOf(missingPeopleEntity.getMissingPeopleDetailEntity().getBottomType()));
        this.clothesInfo.setBagType(String.valueOf(missingPeopleEntity.getMissingPeopleDetailEntity().getBagType()));
    }


    public static DetectionRequestDto fromEntity(MissingPeopleEntity missingPeopleEntity) {
        return new DetectionRequestDto(missingPeopleEntity);
    }
}
