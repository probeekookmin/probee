package com.capstone.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.server.model.CCTVEntity;

@Repository
public interface CCTVRepository extends JpaRepository<CCTVEntity, Long> {
}