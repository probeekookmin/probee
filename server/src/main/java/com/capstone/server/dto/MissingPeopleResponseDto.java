package com.capstone.server.dto;

import com.capstone.server.model.MissingPeopleEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MissingPeopleResponseDto {
    private Long id;
    private String name;

    private MissingPeopleResponseDto(MissingPeopleEntity missingPeopleEntity) {
        this.id = missingPeopleEntity.getId();
        this.name = missingPeopleEntity.getName();
    }

    public static MissingPeopleResponseDto fromEntity(MissingPeopleEntity missingPeopleEntity) {
        return new MissingPeopleResponseDto(missingPeopleEntity);
    }

}
