package com.capstone.server.service;

import com.capstone.server.dto.CCTVDto;
import com.capstone.server.model.CCTVEntity;
import com.capstone.server.repository.CCTVRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CCTVService {

    @Autowired
    private CCTVRepository cctvRepository;

    public List<CCTVDto> findCCTVsNearbyLocationWithinDistance(double longitude, double latitude) {

        List<CCTVEntity> cctvEntities = cctvRepository.findCCTVsByDistance(longitude, latitude); // distance 기준: m(미터) 

        return cctvEntities.stream()
                .map(CCTVDto::fromEntity) // 엔티티를 DTO로 변환
                .collect(Collectors.toList());
    }

    public List<CCTVDto> findCCTVsNearbyLocationWithinDistance(double longitude, double latitude, double radius) {

        List<CCTVEntity> cctvEntities = cctvRepository.findCCTVsByDistance(longitude, latitude, radius); // distance 기준: m(미터)

        return cctvEntities.stream()
                .map(CCTVDto::fromEntity) // 엔티티를 DTO로 변환
                .collect(Collectors.toList());
    }
}
