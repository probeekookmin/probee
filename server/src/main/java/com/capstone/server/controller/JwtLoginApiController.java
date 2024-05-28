package com.capstone.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.server.dto.login.JoinRequestDto;
import com.capstone.server.dto.login.LoginRequestDto;
import com.capstone.server.dto.login.LoginResponseDto;
import com.capstone.server.model.UserEntity;
import com.capstone.server.response.SuccessResponse;
import com.capstone.server.service.JwtTokenService;
import com.capstone.server.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class JwtLoginApiController {
    @Value("${jwt.secretKey}")
    private String secretKey;
    @Value("${jwt.expireTime}")
    private long expireTime;

    @Autowired
    private UserService userService;
    @Autowired
    private JwtTokenService jwtTokenService;

    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody JoinRequestDto joinRequestDto) {
        
        // loginId 중복 체크
        userService.checkLoginIdDuplicate(joinRequestDto.getLoginId());

        // 회원가입 
        userService.join(joinRequestDto);
        return ResponseEntity.ok().body(new SuccessResponse("Join Success"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequestDto) {
        // 로그인
        UserEntity user = userService.login(loginRequestDto);

        // Jwt Token 발급
        String jwtToken = jwtTokenService.createToken(user.getLoginId(), secretKey, expireTime);

        LoginResponseDto loginResponseDto = new LoginResponseDto(user, jwtToken);
        return ResponseEntity.ok().body(new SuccessResponse(loginResponseDto));
    }

    @GetMapping("/info")
    public ResponseEntity<?> userInfo(Authentication auth) {
        UserEntity loginUser = userService.getLoginUserByLoginId(auth.getName());

        return ResponseEntity.ok().body(new SuccessResponse(String.format("loginId : %s, role : %s",
        loginUser.getLoginId(), loginUser.getRole().name())));
    }
}