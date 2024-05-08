package com.capstone.server.dto;


import com.capstone.server.model.MissingPeopleEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class MissingPeopleDetailResponseDto {
    private Long id;
    private String missingPeopleName;
    private String gender;
    private String status;
    private LocalDate birthdate;
    private LocalDateTime missingAt;
    private String missingLocation;
    private String missingPeopleType;
    private String profileImage;
    //보호자 정보
    private String guardianName;
    private String phoneNumber;
    private String relationship;
    //착장정보
    private final String koQuery;

    protected MissingPeopleDetailResponseDto(MissingPeopleEntity missingPeopleEntity) {
        this.id = missingPeopleEntity.getId();
        this.missingPeopleName = missingPeopleEntity.getName();
        // TODO : 숫자로 변경 요망
        this.gender = missingPeopleEntity.getGender().getValue();
        this.status = missingPeopleEntity.getStatus().getValue();
        this.birthdate = missingPeopleEntity.getBirthdate();
        this.missingAt = missingPeopleEntity.getMissingAt();
        this.missingLocation = missingPeopleEntity.getMissingLocation();
        this.missingPeopleType = missingPeopleEntity.getMissingPeopleType().getKor();
        this.profileImage = missingPeopleEntity.getProfileImage();
        this.koQuery = missingPeopleEntity.getKoQuery();
    }

    public static MissingPeopleDetailResponseDto fromEntity(MissingPeopleEntity missingPeopleEntity) {
        return new MissingPeopleDetailResponseDto(missingPeopleEntity);
    }
}
