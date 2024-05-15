package com.capstone.server.repository;

import com.capstone.server.model.CCTVEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CCTVRepository extends JpaRepository<CCTVEntity, Long> {

    @Query(value = "SELECT * FROM cctv WHERE ST_DWithin(gps, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326), 1000, true)", nativeQuery = true)
    List<CCTVEntity> findCCTVsByDistance(@Param("longitude") double longitude, @Param("latitude") double latitude);

    @Query(value = "SELECT count(*) FROM cctv WHERE ST_DWithin(gps, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326), 1000, true)", nativeQuery = true)
    long countCCTVsByDistance(@Param("longitude") double longitude, @Param("latitude") double latitude);
}
