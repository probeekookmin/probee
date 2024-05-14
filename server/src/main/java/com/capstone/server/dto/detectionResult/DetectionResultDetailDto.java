package com.capstone.server.dto.detectionResult;

import com.capstone.server.model.CCTVEntity;
import com.capstone.server.model.SearchResultEntity;
import lombok.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
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
        this.similarity = roundTo8DecimalPlaces(searchResultEntity.getSimilarity());
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

    private double roundTo8DecimalPlaces(double value) {
        BigDecimal bigDecimal = BigDecimal.valueOf(value);
        bigDecimal = bigDecimal.setScale(8, RoundingMode.HALF_UP);
        return bigDecimal.doubleValue();
    }
}
