package com.capstone.server.repository;

import com.capstone.server.model.BetweenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BetweenRepository extends JpaRepository<BetweenEntity, Long> {
}
