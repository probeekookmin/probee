package com.capstone.server.controller;


import com.capstone.server.dto.CreateMissingPerson;
import com.capstone.server.service.MissingPersonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class MissingPersonController {
    private final MissingPersonService missingPersonService;

    @PostMapping("/missingPerson")
    public CreateMissingPerson.Response createMissingPerson(@Valid @RequestBody CreateMissingPerson.Request request) {
        log.info("Post /missingPerson");
        log.info("request : {}", request);

        return missingPersonService.createMissingPerson(request);
    }

}
