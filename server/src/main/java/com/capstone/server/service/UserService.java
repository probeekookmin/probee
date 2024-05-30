package com.capstone.server.service;

import java.util.Optional;

import org.postgresql.shaded.com.ongres.scram.common.message.ServerFinalMessage.Error;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capstone.server.code.ErrorCode;
import com.capstone.server.dto.login.JoinRequestDto;
import com.capstone.server.dto.login.LoginRequestDto;
import com.capstone.server.exception.CustomException;
import com.capstone.server.model.UserEntity;
import com.capstone.server.model.enums.UserRole;
import com.capstone.server.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Value("${admin.loginId}")
    private String adminLoginId;

    // 중복된 ID 체크
    public void checkLoginIdDuplicate(String loginId) {
        
        if (userRepository.existsByLoginId(loginId)) {
            throw new CustomException(ErrorCode.DUPLICATE_USER_LOGIN_ID);
        }
    }

    // 회원가입
    @Transactional
    public UserEntity join(JoinRequestDto joinRequestDto) {
        if (!joinRequestDto.getLoginId().contains(adminLoginId)) {
            throw new CustomException(ErrorCode.USER_NOT_ADMIN);
        }
        UserEntity user = userRepository.save(joinRequestDto.toEntity(passwordEncoder.encode(joinRequestDto.getPassword())));

        user.setRole(UserRole.ADMIN);
        return user;
    }

    // 로그인 
    public UserEntity login(LoginRequestDto loginRequestDto) {
        Optional<UserEntity> optionalUser = userRepository.findByLoginId(loginRequestDto.getLoginId());
        if (optionalUser.isEmpty()) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }

        UserEntity user = optionalUser.get();
        
        if (!passwordEncoder.matches(loginRequestDto.getPassword(), user.getPassword())) {
            throw new CustomException(ErrorCode.USER_NOT_MATCH_PASSWORD);
        }

        return user;
    } 

    // user 찾기
    public UserEntity getLoginUserByLoginId(String loginId) {
        if (loginId == null) return null;

        Optional<UserEntity> optionalUser = userRepository.findByLoginId(loginId);
        if (optionalUser.isEmpty()) return null;

        return optionalUser.get();
    }
}
