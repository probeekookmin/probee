package com.capstone.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.server.model.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long>{

}
