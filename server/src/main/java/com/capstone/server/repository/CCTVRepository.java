package com.capstone.server.repository;

import java.util.List;

import org.locationtech.jts.geom.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capstone.server.model.CctvEntity;

@Repository
public interface CctvRepository extends JpaRepository<CctvEntity, Long> {

    @Query(value = "SELECT * FROM cctv WHERE ST_DWithin(gps, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326), :distance, true)", nativeQuery = true)
    List<CctvEntity> findCctvsByDistance(@Param("longitude") double longitude, @Param("latitude") double latitude, @Param("distance") double distance);

}
