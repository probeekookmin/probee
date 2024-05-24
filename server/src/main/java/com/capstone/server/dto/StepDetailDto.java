package com.capstone.server.dto;

import com.capstone.server.model.enums.Step;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class StepDetailDto extends StepDto {
    String detail;

    public StepDetailDto(long missingPeopleId, Step step, String detail) {
        super(missingPeopleId, step);
        this.detail = detail;

    }

    public StepDetailDto(StepDto stepDto, String ss) {
        super(stepDto.missingPeopleId, stepDto.getStep());
        this.detail = ss;
    }
}
