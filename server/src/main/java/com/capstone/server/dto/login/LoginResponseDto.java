package com.capstone.server.dto.login;

import com.capstone.server.model.UserEntity;
import com.capstone.server.model.enums.UserRole;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDto {
    private String loginId;
    private String jwtToken;

    public LoginResponseDto(UserEntity user, String jwtToken) {
        this.loginId = user.getLoginId();
        this.jwtToken = jwtToken;
    }
}
