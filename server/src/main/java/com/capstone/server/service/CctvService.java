package com.capstone.server.service;

import com.capstone.server.dto.CctvDto;
import com.capstone.server.model.CctvEntity;
import com.capstone.server.repository.CctvRepository;

import java.util.List;
import java.util.stream.Collectors;

import org.locationtech.jts.geom.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

@Service
public class CctvService {

    @Autowired
    private CctvRepository cctvRepository;

    public List<CctvDto> findCctvsNearbyLocationWithinDistance(double longitude, double latitude) {

        List<CctvEntity> cctvEntities = cctvRepository.findCctvsByDistance(longitude, latitude); // distance 기준: m(미터) 

        return cctvEntities.stream()
                .map(CctvDto::fromEntity) // 엔티티를 DTO로 변환
                .collect(Collectors.toList());
    }

}
