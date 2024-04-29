package com.capstone.server.repository;

import com.capstone.server.model.CCTVEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CCTVRepository extends JpaRepository<CCTVEntity, Long> {
}
