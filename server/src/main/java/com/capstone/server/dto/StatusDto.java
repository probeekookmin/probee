package com.capstone.server.dto;


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
}
