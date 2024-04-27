package com.capstone.server.dto;

import com.capstone.server.model.MissingPeopleEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
public class MissingPeopleCreateResponseDto {
    private Long id;
    private String name;

    private MissingPeopleCreateResponseDto(MissingPeopleEntity missingPeopleEntity) {
        this.id = missingPeopleEntity.getId();
        this.name = missingPeopleEntity.getName();
    }

    public static MissingPeopleCreateResponseDto fromEntity(MissingPeopleEntity missingPeopleEntity) {
        return new MissingPeopleCreateResponseDto(missingPeopleEntity);
    }
}
