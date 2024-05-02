package com.capstone.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.server.model.GuardianEntity;

@Repository
public interface GuardianRepository extends JpaRepository<GuardianEntity, Long>{

}
