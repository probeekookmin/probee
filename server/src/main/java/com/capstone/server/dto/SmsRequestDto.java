package com.capstone.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;

@Data
@AllArgsConstructor
public class SmsRequestDto {

    String to;
    String text;
    @Value("phone_num")
    final String from;
}
