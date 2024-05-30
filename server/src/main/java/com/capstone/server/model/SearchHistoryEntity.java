package com.capstone.server.model;

import com.capstone.server.model.enums.Step;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "dis_search_history")
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
    private double latitude;

    @NotNull
    private double longitude;

    @NotBlank
    private String locationAddress;

    @Enumerated(EnumType.STRING)
    private Step step;

    @Builder.Default
    private Double searchRadius = 0.5;

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
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
