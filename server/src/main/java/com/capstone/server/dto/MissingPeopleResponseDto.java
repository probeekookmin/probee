package com.capstone.server.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.capstone.server.model.MissingPeopleEntity;
import com.capstone.server.model.enums.Gender;
import com.capstone.server.model.enums.Status;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MissingPeopleResponseDto {
    private Long id;
    private String name;
    private String gender;
    private String status;
    private LocalDate birthdate;
    private LocalDateTime missingAt;
    private String missingLocation;

    private MissingPeopleResponseDto(MissingPeopleEntity missingPeopleEntity) {
        this.id = missingPeopleEntity.getId();
        this.name = missingPeopleEntity.getName();
        // TODO : 숫자로 변경 요망
        this.gender = missingPeopleEntity.getGender().getValue();
        this.status = missingPeopleEntity.getStatus().getValue();
        this.birthdate = missingPeopleEntity.getBirthdate();
        this.missingAt = missingPeopleEntity.getMissingAt();
        this.missingLocation = missingPeopleEntity.getMissingLocation();
    }

    public static MissingPeopleResponseDto fromEntity(MissingPeopleEntity missingPeopleEntity) {
        return new MissingPeopleResponseDto(missingPeopleEntity);
    }

}
