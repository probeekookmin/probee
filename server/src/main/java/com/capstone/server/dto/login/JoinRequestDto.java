package com.capstone.server.dto.login;

import com.capstone.server.model.UserEntity;
import com.capstone.server.model.enums.UserRole;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JoinRequestDto {
    @NotBlank(message = "아이디가 비었습니다.")
    private String loginId;

    @NotBlank(message = "비밀번호가 비었습니다.")
    private String password;

    public UserEntity toEntity(String encodedPassword) {
        return UserEntity.builder()
                .loginId(this.loginId)
                .password(encodedPassword)
                .role(UserRole.USER)
                .build();
    }
}