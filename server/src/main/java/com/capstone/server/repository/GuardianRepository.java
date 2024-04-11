package com.capstone.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.server.model.GuardianEntity;

public interface GuardianRepository extends JpaRepository<GuardianEntity, Long>{

}
