package com.capstone.server.code;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    // TODO: 에러 코드 개별 수정 필요
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "Invalid request."),
    UNAUTHORIZED_REQUEST(HttpStatus.UNAUTHORIZED, "Unauthorized."),
    FORBIDDEN_ACCESS(HttpStatus.FORBIDDEN, "Forbidden."),
    NOT_FOUND(HttpStatus.NOT_FOUND, "Not found."),
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "Not allowed method."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Server error."),

    USER_EXISTS(HttpStatus.CONFLICT, "user exists."),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "user not found by id."),

    MISSING_PEOPLE_NOT_FOUND_BY_ID(HttpStatus.NOT_FOUND, "Not found by id."),

    DATA_INTEGRITY_VALIDATION_ERROR(HttpStatus.BAD_REQUEST, "Invalid request.");
    private final HttpStatus httpStatus;
    private final String message;
}
