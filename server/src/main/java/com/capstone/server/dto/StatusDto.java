package com.capstone.server.dto;


import com.capstone.server.model.MissingPeopleEntity;
import com.capstone.server.model.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StatusDto {
    long missingPeopleId;
    Status status;

    public StatusDto(MissingPeopleEntity missingPeopleEntity) {
        this.missingPeopleId = missingPeopleEntity.getId();
        this.status = missingPeopleEntity.getStatus();
    }


    public static StatusDto fromEntity(MissingPeopleEntity missingPeopleEntity) {
        return new StatusDto(missingPeopleEntity);
    }
}
