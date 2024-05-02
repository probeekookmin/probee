package com.capstone.server.dto;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;

import com.capstone.server.model.CCTVEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CCTVDto {
    private Long id;
    private String locationAddress;
    private double longitude;
    private double latitude;
    
    public static CCTVDto fromEntity(CCTVEntity entity) {
        CCTVDto dto = new CCTVDto();
        dto.setId(entity.getId());
        // dto.setLocationAddress(entity.getLocationAddress());
        dto.setLongitude(entity.getGps().getX());
        dto.setLatitude(entity.getGps().getY());
        return dto;
    }

    public CCTVEntity toEntity() {
        GeometryFactory geometryFactory = new GeometryFactory();
        Point point = geometryFactory.createPoint(new Coordinate(this.longitude, this.latitude));

        return CCTVEntity.builder()
            .gps(point)
            // .locationAddress(locationAddress)
            .build();
    }
}
