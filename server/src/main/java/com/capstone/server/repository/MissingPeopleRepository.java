package com.capstone.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.server.model.MissingPeopleEntity;

public interface MissingPeopleRepository extends JpaRepository<MissingPeopleEntity, Long>{

}
