package com.capstone.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MapCCTV {
    Long id; //cctv id
    List<ImageUrlInfo> images;
    LatLng latlng;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LatLng {
        double lat;
        double lng;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ImageUrlInfo {
        Long resultId;
        String imgUrl;
    }

}
