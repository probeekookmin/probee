package com.capstone.server.service;


import com.capstone.server.dto.MissingPeopleForGuardianDto;
import com.capstone.server.dto.StepDto;
import com.capstone.server.model.MissingPeopleEntity;
import com.capstone.server.repository.MissingPeopleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class GuardianService {
    @Autowired
    private MissingPeopleRepository missingPeopleRepository;

    public MissingPeopleForGuardianDto getMissingPeople(Long id) {
        MissingPeopleEntity missingPeopleEntity = missingPeopleRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + id));
        return MissingPeopleForGuardianDto.fromEntity(missingPeopleEntity);
    }

    public StepDto getStep(Long id) {
        MissingPeopleEntity missingPeopleEntity = missingPeopleRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Missing person not found with ID: " + id));
        return StepDto.fromEntity(missingPeopleEntity);
    }
}
