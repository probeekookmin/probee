package com.capstone.server.controller;

import com.capstone.server.dto.guardian.BetweenPostRequestDto;
import com.capstone.server.model.enums.SearchResultSortBy;
import com.capstone.server.model.enums.Step;
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
    public ResponseEntity<?> getFirstStepResult(
            @PathVariable Long id,
            @RequestParam(required = false, defaultValue = "similarity", value = "criteria") String criteria,
            @RequestParam(required = false, defaultValue = "1", value = "page") int page,
            @RequestParam(required = false, defaultValue = "50", value = "size") int pageSize) {
        SearchResultSortBy sortBy = SearchResultSortBy.fromValue(criteria);
        Step searchStep = Step.fromValue("first");
        return ResponseEntity.ok().body(new SuccessResponse(guardianService.getBetween(id, searchStep, page - 1, pageSize, sortBy)));
    }

    @PostMapping("/{id}/between")
    public ResponseEntity<?> uploadBetweenResult(@PathVariable Long id, @RequestBody BetweenPostRequestDto betweenPostRequestDto) {
        return ResponseEntity.ok().body(new SuccessResponse(guardianService.postBetween(id, betweenPostRequestDto)));
    }

}
