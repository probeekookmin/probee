package com.capstone.server.dto;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;

import com.capstone.server.model.CctvEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CctvDto {
    private Long id;
    private String locationAddress;
    private double longitude;
    private double latitude;
    
    public static CctvDto fromEntity(CctvEntity entity) {
        CctvDto dto = new CctvDto();
        dto.setId(entity.getId());
        // dto.setLocationAddress(entity.getLocationAddress());
        dto.setLongitude(entity.getGps().getX());
        dto.setLatitude(entity.getGps().getY());
        return dto;
    }

    public CctvEntity toEntity() {
        GeometryFactory geometryFactory = new GeometryFactory();
        Point point = geometryFactory.createPoint(new Coordinate(this.longitude, this.latitude));

        return CctvEntity.builder()
            .gps(point)
            // .locationAddress(locationAddress)
            .build();
    }
}
