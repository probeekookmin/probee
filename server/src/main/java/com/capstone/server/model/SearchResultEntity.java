package com.capstone.server.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "SearchResult")
public class SearchResultEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long searchResultId;

    @NotNull
    private Boolean searchResultSuccess;

    @NotBlank
    private String searchResultImageUrl;

    // N:1 양방향 관계 매핑
    @ManyToOne
    @JoinColumn(name = "cctvInfoId")
    private CCTVInfoEntity cctvInfoEntity;

    // N:1 양방향 관계 매핑
    @ManyToOne
    @JoinColumn(name = "searchHistoryId")
    private SearchHistoryEntity searchHistoryEntity;

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
