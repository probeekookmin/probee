package com.capstone.server.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

import com.capstone.server.model.enums.*;

@Data
@Builder
@Entity(name = "missing_people_detail")
public class MissingPeopleDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "missing_people_detail_id")
    private Long id;

    private HairStyle hairStyle;

    private TopType topType;

    private Color topColor;

    private BottomType bottomType;

    private Color bottomColor;

    private BagType bagType;

    private Color bagColor;

    private Color shoesColor;

    // TODO: 빼는 게 나을지도
    private Boolean stripes;

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
