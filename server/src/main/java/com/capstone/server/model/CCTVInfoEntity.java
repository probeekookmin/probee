package com.capstone.server.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "CCTVInfo")
public class CCTVInfoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cctvInfoId;

    @NotBlank
    private BigDecimal cctvLatitude;

    @NotBlank
    private BigDecimal cctvLogitude;

    // N:1 양방향 관계 매핑
    @OneToMany(mappedBy = "cctvInfoEntity")
    List<SearchResultEntity> searchResultEntities;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate 
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
