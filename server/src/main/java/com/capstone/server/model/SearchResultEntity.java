package com.capstone.server.model;

import static jakarta.persistence.FetchType.LAZY;

import java.time.LocalDateTime;

import org.hibernate.validator.constraints.URL;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "search_result")
public class SearchResultEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "search_result_id")
    private Long id;

    @NotNull
    private Boolean success;

    private String imageUrl;

    // @ManyToOne(fetch = LAZY)
    // @JoinColumn(name = "cctv_id")
    // private CCTVEntity cctvEntity;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "search_history_id")
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
