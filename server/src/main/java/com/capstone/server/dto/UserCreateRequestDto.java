package com.capstone.server.dto;

import com.capstone.server.model.UserEntity;
import com.capstone.server.model.enums.userEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserCreateRequestDto {

    // @NotEmpty(message = "Name is required")
    private String name;

    // @Positive(message = "Age is up to 0")
    // @NotNull(message = "Age is required")
    private Integer age;

    // @Email(message = "Invalid email address")
    // @NotEmpty(message = "Email is required")
    private String email;

    private BigDecimal latitude;

    private BigDecimal longitude;

    private LocalDateTime whenCreatedAt;

    private userEnum userEnum;

    public UserEntity toEntity() {
        return UserEntity.builder().name(name).age(age).email(email).latitude(latitude).longitude(longitude).whenCreatedAt(whenCreatedAt).userEnum(userEnum).build();
    }
}
