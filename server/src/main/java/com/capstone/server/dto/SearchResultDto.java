package com.capstone.server.dto;

import com.capstone.server.model.SearchResultEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@AllArgsConstructor
public class SearchResultDto {
    private double similarity;
    private String imgUrl;
    private LocalDateTime time;

    public SearchResultDto(SearchResultEntity searchResultEntity) {
        this.similarity = searchResultEntity.getSimilarity();
        this.imgUrl = searchResultEntity.getImageUrl();
        this.time = extractDateTime(imgUrl);
    }

    static LocalDateTime extractDateTime(String s) {
        String[] temp = s.split("/");
        String lastPart = temp[temp.length - 1];
        String date = lastPart.split("_")[1];
        String[] times = lastPart.split("_")[2].split("-");
        String time = times[0] + "-" + times[1] + "-" + times[2];
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss");
        return LocalDateTime.parse(date + "_" + time, formatter);
    }

    public static SearchResultDto fromEntity(SearchResultEntity searchResultEntity) {
        return new SearchResultDto(searchResultEntity);
    }
}
