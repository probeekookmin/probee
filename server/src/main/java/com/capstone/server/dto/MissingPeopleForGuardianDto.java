package com.capstone.server.dto;

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
        this.profileImage = missingPeopleEntity.getProfileImage();
        this.query = missingPeopleEntity.getQuery();
    }

    public static MissingPeopleForGuardianDto fromEntity(MissingPeopleEntity missingPeopleEntity) {
        return new MissingPeopleForGuardianDto(missingPeopleEntity);
    }
}
