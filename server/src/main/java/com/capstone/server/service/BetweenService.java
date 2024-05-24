package com.capstone.server.service;

import com.capstone.server.dto.MapCCTV;
import com.capstone.server.model.BetweenEntity;
import com.capstone.server.model.CCTVEntity;
import com.capstone.server.model.SearchResultEntity;
import com.capstone.server.repository.BetweenRepository;
import org.locationtech.jts.geom.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BetweenService {

    @Autowired
    private BetweenRepository betweenRepository;


    public List<MapCCTV> getSearchResultsByMissingPeopleId(Long missingPeopleId) {
        List<BetweenEntity> betweenEntities = betweenRepository.findByMissingPeopleId(missingPeopleId);

        Map<Long, MapCCTV> mapCCTVMap = new HashMap<>();
        for (BetweenEntity betweenEntity : betweenEntities) {
            SearchResultEntity searchResult = betweenEntity.getSearchResult();
            Long cctvId = searchResult.getCctvEntity().getId();
            MapCCTV mapCCTV = mapCCTVMap.get(cctvId);

            if (mapCCTV == null) {
                mapCCTV = convertToMapCCTV(searchResult);
                mapCCTVMap.put(cctvId, mapCCTV);
            } else {
                mapCCTV.getImages().add(new MapCCTV.ImageUrlInfo(searchResult.getId(), searchResult.getImageUrl()));
            }
        }
        return new ArrayList<>(mapCCTVMap.values());
    }

    private MapCCTV convertToMapCCTV(SearchResultEntity searchResult) {
        CCTVEntity cctvEntity = searchResult.getCctvEntity();
        Long cctvId = cctvEntity.getId();
        List<MapCCTV.ImageUrlInfo> imgUrl = new ArrayList<>();
        imgUrl.add(new MapCCTV.ImageUrlInfo(searchResult.getId(), searchResult.getImageUrl())); // 초기 URL 추가
        Point gps = cctvEntity.getGps();
        MapCCTV.LatLng latlng = new MapCCTV.LatLng(gps.getY(), gps.getX());

        return new MapCCTV(cctvId, imgUrl, latlng);
    }


}
