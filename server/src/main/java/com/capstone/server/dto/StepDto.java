package com.capstone.server.dto;


import com.capstone.server.model.MissingPeopleEntity;
import com.capstone.server.model.enums.Step;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StepDto {
    long missingPeopleId;
    Step step;

    public StepDto(MissingPeopleEntity missingPeopleEntity) {
        this.missingPeopleId = missingPeopleEntity.getId();
        this.step = missingPeopleEntity.getStep();
    }


    public static StepDto fromEntity(MissingPeopleEntity missingPeopleEntity) {
        return new StepDto(missingPeopleEntity);
    }
}
