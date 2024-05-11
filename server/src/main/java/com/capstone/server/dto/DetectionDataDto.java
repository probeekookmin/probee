package com.capstone.server.dto;


import com.capstone.server.model.SearchResultEntity;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Data
@AllArgsConstructor
public class DetectionDataDto {
    long searchId; //backend server에 결과 넣을 때 사용
    long missingPeopleId; //backend server에 결과 넣을 때 사용
    String query; //영어쿼리
    String koQuery; //한국어 쿼리 //요청에 영어쿼리가 있으면 도착안함
    List<ImageData> data;

    @Data
    @AllArgsConstructor
    public static class ImageData {
        private String img_path;
        private Long cctvId;
        @NotNull
        private double Similarity;

        public SearchResultEntity toSearchResultEntity() {
            return SearchResultEntity.builder()
                    .success(true)
                    .imageUrl(img_path)
                    .similarity(Similarity)
                    .time(extractDateTime(img_path))
                    .build();
        }

        //파일명에 저장된 사진의 시간정보 파싱.
        LocalDateTime extractDateTime(String s) {
            String[] temp = s.split("/");
            String lastPart = temp[temp.length - 1];
            String date = lastPart.split("_")[1];
            String[] times = lastPart.split("_")[2].split("-");
            String time = times[0] + "-" + times[1] + "-" + times[2];
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss");
            return LocalDateTime.parse(date + "_" + time, formatter);
        }
    }


}
