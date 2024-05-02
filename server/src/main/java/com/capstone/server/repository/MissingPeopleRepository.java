package com.capstone.server.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.capstone.server.dto.MissingPeopleResponseDto;
import com.capstone.server.model.MissingPeopleEntity;
import com.capstone.server.model.enums.Status;
import java.util.List;

@Repository
public interface MissingPeopleRepository extends JpaRepository<MissingPeopleEntity, Long>{
    Page<MissingPeopleEntity> findAll(Pageable pageable);
    Page<MissingPeopleEntity> findByStatus(Pageable pageable, Status status);
    Page<MissingPeopleEntity> findByNameContaining(Pageable pageable, String keyword);
    Page<MissingPeopleEntity> findByNameContainingAndStatus(Pageable pageable, String keyword, Status status);
}

