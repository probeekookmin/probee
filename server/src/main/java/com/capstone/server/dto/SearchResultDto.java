package com.capstone.server.dto;

import com.capstone.server.model.CCTVEntity;
import com.capstone.server.model.SearchResultEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class SearchResultDto {
    private double similarity;
    private String imgUrl;
    private LocalDateTime time;
    private CCTV cctv;


    public SearchResultDto(SearchResultEntity searchResultEntity) {
        this.similarity = searchResultEntity.getSimilarity();
        this.imgUrl = searchResultEntity.getImageUrl();
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

    public static SearchResultDto fromEntity(SearchResultEntity searchResultEntity) {
        return new SearchResultDto(searchResultEntity);
    }
}
