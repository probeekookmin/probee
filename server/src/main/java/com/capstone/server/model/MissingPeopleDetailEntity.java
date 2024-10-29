package com.capstone.server.model;

import com.capstone.server.model.enums.*;
import jakarta.persistence.*;
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
@Entity(name = "dis_missing_people_detail")
public class MissingPeopleDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "missing_people_detail_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private HairStyle hairStyle;

    @Enumerated(EnumType.STRING)
    private TopType topType;

    @Enumerated(EnumType.STRING)
    private Color topColor;

    @Enumerated(EnumType.STRING)
    private BottomType bottomType;

    @Enumerated(EnumType.STRING)
    private Color bottomColor;

    @Enumerated(EnumType.STRING)
    private BagType bagType;

    @OneToOne(fetch = LAZY)
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
