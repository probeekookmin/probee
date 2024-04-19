package com.capstone.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.capstone.server.dto.CCTVDto;
import com.capstone.server.model.CCTVEntity;
import com.capstone.server.repository.CCTVRepository;
import com.capstone.server.response.SuccessResponse;

import java.util.List;

@RestController
@RequestMapping("/api/cctv")
public class CCTVController {
    @Autowired
    private final CCTVRepository cctvRepository = null;

    @GetMapping
    public ResponseEntity<List<CCTVEntity>> getAllCCTV() {
        List<CCTVEntity> cctvList = cctvRepository.findAll();
        return ResponseEntity.ok().body(cctvList);
    }

    @PostMapping
    public ResponseEntity<?> createCCTV(@RequestBody CCTVDto cctvDto) {
        CCTVEntity createdCCTV = cctvRepository.save(cctvDto.toCCTVEntity());
        return ResponseEntity.ok().body(new SuccessResponse(cctvDto.fromEntity(createdCCTV)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CCTVEntity> getCCTVById(@PathVariable Long id) {
        CCTVEntity cctv = cctvRepository.findById(id)
                .orElseThrow();
        return ResponseEntity.ok().body(cctv);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CCTVEntity> updateCCTV(@PathVariable Long id, @RequestBody CCTVEntity cctvDetails) {
        CCTVEntity cctv = cctvRepository.findById(id)
                .orElseThrow();
        cctv.setLocationAddress(cctvDetails.getLocationAddress());
        cctv.setPoint(cctvDetails.getPoint()); // Assuming you have setter for coordinates
        CCTVEntity updatedCCTV = cctvRepository.save(cctv);
        return ResponseEntity.ok().body(updatedCCTV);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCCTV(@PathVariable Long id) {
        CCTVEntity cctv = cctvRepository.findById(id)
                .orElseThrow();
        cctvRepository.delete(cctv);
        return ResponseEntity.noContent().build();
    }
}
