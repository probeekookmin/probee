package com.capstone.server.model;

import com.capstone.server.model.enums.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import static jakarta.persistence.FetchType.LAZY;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "search_history")
public class SearchHistoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "search_history_id")
    private Long id;

    @Past
    private LocalDateTime startTime;
    
    @PastOrPresent
    private LocalDateTime endTime;

    @NotNull
    private BigDecimal latitude;

    @NotNull
    private BigDecimal longitude;

    @NotBlank
    private String locationAddress;

    @Enumerated(EnumType.STRING)
    private SearchStatus searchStatus;

    @Builder.Default
    private Integer searchRadius = 1; // 1km

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "missing_people_id")
    private MissingPeopleEntity missingPeopleEntity;

    @OneToMany(mappedBy = "searchHistoryEntity", cascade = CascadeType.ALL)
    private List<SearchResultEntity> searchResultEntities;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        startTime = LocalDateTime.now();
    }

    @PreUpdate 
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
