package com.capstone.server.model.enums;

import com.capstone.server.code.ErrorCode;
import com.capstone.server.exception.CustomException;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserRole {
    USER("사용자", "user"),
    ADMIN("관리자", "admin");

    private final String kor;
    private final String value;
}
