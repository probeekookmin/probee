package com.capstone.server.repository;

import com.capstone.server.model.SearchHistoryEntity;
import com.capstone.server.model.SearchResultEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SearchResultRepository extends JpaRepository<SearchResultEntity, Long> {
    List<SearchResultEntity> findAllBySearchHistoryEntity(SearchHistoryEntity searchHistoryEntity);
}
