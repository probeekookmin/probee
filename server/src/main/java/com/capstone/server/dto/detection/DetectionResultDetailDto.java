package com.capstone.server.dto.detection;

import com.capstone.server.dto.CCTVDto;
import com.capstone.server.model.CCTVEntity;
import com.capstone.server.model.SearchResultEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class DetectionResultDetailDto extends DetectionResultDto {
    private double similarity;
    private LocalDateTime time;
    private CCTVDto cctv;


    public DetectionResultDetailDto(SearchResultEntity searchResultEntity) {
        super(searchResultEntity.getId(), searchResultEntity.getImageUrl());
        this.similarity = roundTo8DecimalPlaces(searchResultEntity.getSimilarity());
        this.time = searchResultEntity.getTime();
        CCTVEntity cctvEntity = searchResultEntity.getCctvEntity();
        this.cctv = CCTVDto.fromEntity(cctvEntity);
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
