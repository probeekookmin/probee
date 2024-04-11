package com.capstone.server.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.capstone.server.model.MissingPeopleEntity;
import com.capstone.server.model.UserEntity;
import com.capstone.server.model.enums.Gender;
import com.capstone.server.model.enums.PoliceStation;
import com.capstone.server.model.enums.Status;
import com.capstone.server.model.enums.userEnum;

import jakarta.validation.constraints.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MissingPeopleCreateRequestDto {

    // // @NotEmpty(message = "Name is required")
    // private String name;

    // // @Positive(message = "Age is up to 0")
    // // @NotNull(message = "Age is required")
    // private Integer age;

    // // @Email(message = "Invalid email address")
    // // @NotEmpty(message = "Email is required")
    // private String email;

    // private BigDecimal latitude;

    // private BigDecimal longitude;

    // private LocalDateTime whenCreatedAt;

    // private userEnum userEnum;

    private String name; 
    private LocalDateTime birthdate;
    private Gender gender; 
    private LocalDateTime missingAt; 
    private LocalDateTime registrationAt; 
    private String missingLocation;
    // private PoliceStation policeStation;
    // private Status status;
    

    public MissingPeopleEntity toEntity(){
        return MissingPeopleEntity.builder().name(name).birthdate(birthdate).gender(gender).missingAt(missingAt).registrationAt(registrationAt).missingLocation(missingLocation).build();
    }
}
