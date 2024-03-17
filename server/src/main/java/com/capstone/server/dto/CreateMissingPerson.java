package com.capstone.server.dto;

import com.capstone.server.entity.MissingPerson;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

public class CreateMissingPerson {
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @ToString
    public static class Request {
        @NotNull
        private String name;
        @NotNull
        private LocalDateTime MissingAt;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private String name;
        private LocalDateTime missingAt;
        private LocalDateTime registrationAt;

        public static Response fromEntity(MissingPerson missingPerson) {
            return Response.builder()
                    .name(missingPerson.getName())
                    .missingAt(missingPerson.getMissingAt())
                    .registrationAt(missingPerson.getRegistrationAt())
                    .build();
        }
    }

}
