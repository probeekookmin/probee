package com.capstone.server.repository;

import com.capstone.server.model.SearchHistoryEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchHistoryRepository extends JpaRepository<SearchHistoryEntity, Long> {
    List<SearchHistoryEntity> findByMissingPeopleEntityId(Long id);
}
