package com.capstone.server.model;

import com.capstone.server.model.enums.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@Entity(name = "missing_people")
public class MissingPeopleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "missing_people_id")
    private Long id;

    @NotBlank
    private String name;

    @PastOrPresent
    private LocalDateTime birthdate;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Past
    private LocalDateTime missingAt;

    @PastOrPresent
    private LocalDateTime registrationAt;

    @NotBlank
    private String missingLocation;

    @Enumerated(EnumType.STRING)
    private PoliceStation policeStation;

    @Enumerated(EnumType.STRING)
    private Status status;

    @OneToOne(mappedBy = "guardianEntity", cascade = CascadeType.ALL)
    private GuardianEntity guardianEntity;

    @OneToOne(mappedBy = "missingPeopleEntity", cascade = CascadeType.ALL)
    private MissingPeopleDetailEntity missingPeopleDetailEntity;

    @OneToMany(mappedBy = "missingPeopleEntity", cascade = CascadeType.ALL)
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
