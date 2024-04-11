package com.capstone.server.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.capstone.server.code.UserErrorCode;
import com.capstone.server.dto.UserUpdateRequestDto;
import com.capstone.server.exception.UserException;
import com.capstone.server.model.UserEntity;
import com.capstone.server.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserEntity createUser(UserEntity userEntity) {
        try {
            System.out.println("ASDASD");
            return userRepository.save(userEntity);
        } catch (Exception e) {
            throw new UserException(UserErrorCode.USER_EXISTS, e);
        }
    }

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public UserEntity updateUserNameById(Long userId, UserUpdateRequestDto userUpdateRequestDto) {
        Optional<UserEntity> existingUserOptional = userRepository.findById(userId);
        if (existingUserOptional.isPresent()) {
            UserEntity existingUser = existingUserOptional.get();
            existingUser.setName(userUpdateRequestDto.getName());
            return userRepository.save(existingUser);
        } else {
            throw new UserException(UserErrorCode.USER_NOT_FOUND);
        }
    }
}
