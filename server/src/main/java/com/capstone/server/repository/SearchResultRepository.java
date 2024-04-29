package com.capstone.server.repository;

import com.capstone.server.model.SearchResultEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.server.model.SearchHistoryEntity;

public interface SearchResultRepository extends JpaRepository<SearchResultEntity, Long>{

}
