package com.capstone.server.repository;

import com.capstone.server.model.BetweenEntity;
import com.capstone.server.model.SearchHistoryEntity;
import com.capstone.server.model.SearchResultEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BetweenRepository extends JpaRepository<BetweenEntity, Long> {
    @Query("SELECT sr FROM between bt JOIN bt.searchResult sr WHERE sr.searchHistoryEntity = :searchHistoryEntity ORDER BY sr.similarity DESC, sr.time DESC")
    Page<SearchResultEntity> findAllBySearchHistoryEntity(Pageable pageable, SearchHistoryEntity searchHistoryEntity);
}
