package com.capstone.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.server.model.SearchHistoryEntity;

@Repository
public interface SearchHistoryRepository extends JpaRepository<SearchHistoryEntity, Long>{

}
