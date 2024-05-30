package com.capstone.server.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static jakarta.persistence.FetchType.LAZY;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "dis_search_result")
public class SearchResultEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "search_result_id")
    private Long id;

    @NotNull
    private Boolean success;

    private String imageUrl;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "cctv_id")
    private CCTVEntity cctvEntity;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "search_history_id")
    private SearchHistoryEntity searchHistoryEntity;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private double similarity;
    private LocalDateTime time;


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
