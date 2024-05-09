package com.capstone.server.repository;

import com.capstone.server.model.GuardianEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuardianRepository extends JpaRepository<GuardianEntity, Long> {
    GuardianEntity findByMissingPeopleEntityId(Long id);
}
