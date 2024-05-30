package com.capstone.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.server.model.UserEntity;
import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<UserEntity, Long>{
    boolean existsByLoginId(String loginId);
    Optional<UserEntity> findByLoginId(String loginId);
}
