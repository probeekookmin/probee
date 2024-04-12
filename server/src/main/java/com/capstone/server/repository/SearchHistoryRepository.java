package com.capstone.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.server.model.SearchHistoryEntity;

public interface SearchHistoryRepository extends JpaRepository<SearchHistoryEntity, Long>{

}
