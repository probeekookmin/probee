package com.capstone.server.controller;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.capstone.server.dto.CctvDto;
import com.capstone.server.model.CctvEntity;
import com.capstone.server.model.CctvEntity;
import com.capstone.server.repository.CctvRepository;
import com.capstone.server.response.SuccessResponse;
import com.capstone.server.service.CctvService;

import java.util.List;

@RestController
@RequestMapping("/api/cctv")
public class CctvController {

    @Autowired
    private CctvService cctvService;
    @Autowired
    private CctvRepository cctvRepository;

    @GetMapping
    public ResponseEntity<?> getAllCctv(
        @RequestParam(required = true, value = "longitude") double longitude,
        @RequestParam(required = true, value = "latitude") double latitude,
        @RequestParam(required = false, defaultValue = "1000", value = "distance") double distance) {
        
        List<CctvDto> CctvList = cctvService.findCctvsNearbyLocationWithinDistance(longitude, latitude);
        return ResponseEntity.ok().body(CctvList);
    }

    @PostMapping
    public ResponseEntity<?> createCctv(@RequestBody CctvDto CctvDto) {
        CctvEntity createdCctv = cctvRepository.save(CctvDto.toEntity());
        return ResponseEntity.ok().body(new SuccessResponse(CctvDto.fromEntity(createdCctv)));
    }

}
