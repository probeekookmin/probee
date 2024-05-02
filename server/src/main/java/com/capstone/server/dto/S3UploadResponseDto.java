package com.capstone.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class S3UploadResponseDto {
    private String url;
    private String path;
    // TODO : 필요한 정보 추가
}
