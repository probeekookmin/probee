package com.capstone.server.repository;

import com.capstone.server.model.SearchHistoryEntity;
import com.capstone.server.model.SearchResultEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchResultRepository extends JpaRepository<SearchResultEntity, Long> {
    List<SearchResultEntity> findByIdIn(List<Long> ids);

    Page<SearchResultEntity> findAllBySearchHistoryEntity(Pageable pageable, SearchHistoryEntity searchHistoryEntity);

}
