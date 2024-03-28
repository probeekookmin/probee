package com.capstone.server.model;

import com.capstone.server.model.enums.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "MissingPeople")
public class MissingPeopleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long missingPeopleId;

    @NotBlank
    private String missingPeopleName;

    @NotBlank
    private LocalDateTime missingPeopleBirthdate;

    @NotBlank
    @Enumerated(EnumType.STRING)
    private Gender missingPeopleGender;

    @NotBlank
    private LocalDateTime missingAt;

    private LocalDateTime registrationAt;

    @NotBlank
    private String missingLocation;

    @NotBlank
    @Enumerated(EnumType.STRING)
    private PoliceStation policeStation;

    @NotBlank
    @Enumerated(EnumType.STRING)
    private Status missingPeopleStatus;

    // 1:1 단방향 관계 매핑
    @OneToOne
    @JoinColumn(name = "guardianId")
    private GuardianEntity guardianEntity;

    // 1:1 단방향 관계 매핑
    @OneToOne
    @JoinColumn(name = "missingPeopleDetailId")
    private MissingPeopleDetailEntity missingPeopleDetailEntity;

    // N:1 양방향 관계 매핑
    @OneToMany(mappedBy = "missingPeopleEntity")
    private List<SearchHistoryEntity> searchHistoryEntities;
  
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        registrationAt = LocalDateTime.now();
    }

    @PreUpdate 
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
