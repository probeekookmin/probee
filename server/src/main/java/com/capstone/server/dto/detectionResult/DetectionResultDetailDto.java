package com.capstone.server.dto.detectionResult;

import com.capstone.server.model.CCTVEntity;
import com.capstone.server.model.SearchResultEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class DetectionResultDetailDto extends DetectionResultDto {
    private double similarity;
    private LocalDateTime time;
    private CCTV cctv;

    public DetectionResultDetailDto(SearchResultEntity searchResultEntity) {
        super(searchResultEntity.getId(), searchResultEntity.getImageUrl());
        this.similarity = searchResultEntity.getSimilarity();
        this.time = searchResultEntity.getTime();
        CCTVEntity cctvEntity = searchResultEntity.getCctvEntity();
        this.cctv = new CCTV(cctvEntity.getId(), cctvEntity.getGps().getX(), cctvEntity.getGps().getY());
    }

    @AllArgsConstructor
    @Data
    static class CCTV {
        private long cctvId;
        private double latitude;
        private double longitude;

    }

    public static DetectionResultDetailDto fromEntity(SearchResultEntity searchResultEntity) {
        return new DetectionResultDetailDto(searchResultEntity);
    }
}
