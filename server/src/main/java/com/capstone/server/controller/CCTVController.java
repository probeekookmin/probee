package com.capstone.server.controller;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.capstone.server.dto.CCTVDto;
import com.capstone.server.model.CCTVEntity;
import com.capstone.server.model.CCTVEntity;
import com.capstone.server.repository.CCTVRepository;
import com.capstone.server.response.SuccessResponse;
import com.capstone.server.service.CCTVService;

import java.util.List;

@RestController
@RequestMapping("/api/cctv")
public class CCTVController {

    @Autowired
    private CCTVService cctvService;
    @Autowired
    private CCTVRepository cctvRepository;

    @GetMapping
    public ResponseEntity<?> getAllCCTV(
        @RequestParam(required = true, value = "longitude") double longitude,
        @RequestParam(required = true, value = "latitude") double latitude,
        @RequestParam(required = false, defaultValue = "1000", value = "distance") double distance) {
        
        List<CCTVDto> CCTVList = cctvService.findCCTVsNearbyLocationWithinDistance(longitude, latitude);
        return ResponseEntity.ok().body(CCTVList);
    }

    @PostMapping
    public ResponseEntity<?> createCCTV(@RequestBody CCTVDto CCTVDto) {
        CCTVEntity createdCCTV = cctvRepository.save(CCTVDto.toEntity());
        return ResponseEntity.ok().body(new SuccessResponse(CCTVDto.fromEntity(createdCCTV)));
    }

}
