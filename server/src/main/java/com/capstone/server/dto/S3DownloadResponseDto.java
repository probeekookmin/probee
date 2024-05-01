package com.capstone.server.dto;

import com.amazonaws.services.s3.model.S3ObjectSummary;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class S3DownloadResponseDto {
    private String url;
    private String path;
    private Long size;
    // TODO : 필요한 정보 추가

    private S3DownloadResponseDto(S3ObjectSummary summary) {
        this.url = summary.getKey();
        this.size = summary.getSize();
    }

    public static S3DownloadResponseDto fromSummary(S3ObjectSummary summary) {
        return new S3DownloadResponseDto(summary);
    }

}
