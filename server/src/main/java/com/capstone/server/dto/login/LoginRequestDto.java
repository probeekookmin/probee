package com.capstone.server.dto.login;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginRequestDto {
    @NotBlank(message = "아이디가 비었습니다.")
    private String loginId;

    @NotBlank(message = "비밀번호가 비었습니다.")
    private String password;
}
