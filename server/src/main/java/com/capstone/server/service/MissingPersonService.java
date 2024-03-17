package com.capstone.server.service;

import com.capstone.server.dto.CreateMissingPerson;
import com.capstone.server.entity.MissingPerson;
import com.capstone.server.repository.MissingPersonRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MissingPersonService {
    private final MissingPersonRepository missingPersonRepository;

    @Transactional
    public CreateMissingPerson.Response createMissingPerson(CreateMissingPerson.Request request) {
        MissingPerson missingPerson = MissingPerson.builder()
                .name(request.getName())
                .missingAt(request.getMissingAt())
                .build();
        missingPersonRepository.save(missingPerson);
        return CreateMissingPerson.Response.fromEntity(missingPerson);
    }

}
