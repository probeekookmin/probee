package com.capstone.server.model;

import com.capstone.server.model.enums.*;
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
@Entity(name = "SearchHistory")
public class SearchHistoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long searchHistoryId;

    private LocalDateTime searchStartTime;
    
    private LocalDateTime searchEndTime;

    @NotBlank
    private BigDecimal searchLatitude;

    @NotBlank
    private BigDecimal searchLongitude;

    @NotBlank
    private SearchStatus searchStatus;

    @NotBlank
    private Long searchRadius;

    // N:1 양방향 관계 매핑
    @ManyToOne
    @JoinColumn(name = "missingPeopleId")
    private MissingPeopleEntity missingPeopleEntity;

    // N:1 양방향 관계 매핑
    @OneToMany(mappedBy = "searchHistoryEntity")
    private List<SearchResultEntity> searchResultEntities;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        searchStartTime = LocalDateTime.now();
    }

    @PreUpdate 
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
