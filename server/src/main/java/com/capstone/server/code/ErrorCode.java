package com.capstone.server.code;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // TODO: 에러 코드 개별 수정 필요
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "Invalid request."),
    UNAUTHORIZED_REQUEST(HttpStatus.UNAUTHORIZED, "Unauthorized."),
    FORBIDDEN_ACCESS(HttpStatus.FORBIDDEN, "Forbidden."),
    NOT_FOUND(HttpStatus.NOT_FOUND, "Not found."),
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "Not allowed method."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Server error."),

    DATA_INTEGRITY_VALIDATION_ERROR(HttpStatus.BAD_REQUEST, "Invalid request."),

    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "user not found by id."),
    MISSING_PEOPLE_NOT_FOUND_BY_ID(HttpStatus.NOT_FOUND, "Not found by id."),
    RESULT_NOT_FOUND(HttpStatus.NOT_FOUND, "don't exist results"),

    USER_EXISTS(HttpStatus.CONFLICT, "user exists."),

    MESSAGE_SEND_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "message sending fail"),
    AI_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "AI SERVER ERROR"),
    INVALID_REQUEST_DATA(HttpStatus.UNPROCESSABLE_ENTITY, "AI server request is wrong"),
    CONNECTION_ERROR(HttpStatus.SERVICE_UNAVAILABLE, "AI SERVER is CLOSE");

    private final HttpStatus httpStatus;
    private final String message;
}
