package com.capstone.server.controller;

import com.capstone.server.response.SuccessResponse;
import com.capstone.server.service.GuardianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/guardian")
public class GuardianController {


    @Autowired
    private GuardianService guardianService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getMissingPeople(@PathVariable Long id) {
        return ResponseEntity.ok().body(new SuccessResponse(guardianService.getMissingPeople(id)));
    }

    @GetMapping("/{id}/step")
    public ResponseEntity<?> getStep(@PathVariable Long id) {
        return ResponseEntity.ok().body(new SuccessResponse(guardianService.getStep(id)));
    }

    @GetMapping("/{id}/between")
    public ResponseEntity<?> getFirstStepResult(@PathVariable Long id) {
        return ResponseEntity.ok().body(new SuccessResponse());
    }

    @PostMapping("/{id}/between")
    public ResponseEntity<?> uploadBetweenResult(@PathVariable Long id) {
        return ResponseEntity.ok().body(new SuccessResponse());
    }

}
