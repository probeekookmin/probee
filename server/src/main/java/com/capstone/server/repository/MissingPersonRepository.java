package com.capstone.server.repository;


import com.capstone.server.entity.MissingPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MissingPersonRepository extends JpaRepository<MissingPerson, Long> {
    Optional<MissingPerson> findByName(String name);
}
