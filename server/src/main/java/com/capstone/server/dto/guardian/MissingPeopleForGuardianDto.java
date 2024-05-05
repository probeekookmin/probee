package com.capstone.server.dto.guardian;

import com.capstone.server.model.MissingPeopleEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class MissingPeopleForGuardianDto {
    private String missingPeopleName;
    private LocalDate birthdate;
    private String profileImage;
    private String query;

    public MissingPeopleForGuardianDto(MissingPeopleEntity missingPeopleEntity) {
        this.missingPeopleName = missingPeopleEntity.getName();
        this.birthdate = missingPeopleEntity.getBirthdate();
        this.profileImage = imageCheck(missingPeopleEntity.getProfileImage());
        this.query = missingPeopleEntity.getQuery();
    }

    public static MissingPeopleForGuardianDto fromEntity(MissingPeopleEntity missingPeopleEntity) {
        return new MissingPeopleForGuardianDto(missingPeopleEntity);
    }

    public static String imageCheck(String imgUrl) {
        if (imgUrl.equals("https://spring-server-image-storage.s3.ap-northeast-2.amazonaws.com/emptyProfile.svg")) {
            return null;
        }
        return imgUrl;
    }

}
