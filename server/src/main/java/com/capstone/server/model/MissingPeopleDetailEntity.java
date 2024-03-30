package com.capstone.server.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@Entity(name = "missing_people_detail")
public class MissingPeopleDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "missing_people_detail_id")
    private Long id;

    private String topCategory;

    private String topColor;

    private String bottomCategory;

    private String bottomColor;

    private String bagCategory;

    private String bagColor;

    private String shoeCategory;

    private String shoeColor;

    private String hairLength;

    @OneToOne
    @JoinColumn(name = "missing_people_id")
    private MissingPeopleEntity missingPeopleEntity;

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
