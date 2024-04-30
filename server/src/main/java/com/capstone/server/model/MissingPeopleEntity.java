package com.capstone.server.model;

import com.capstone.server.model.enums.Gender;
import com.capstone.server.model.enums.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "missing_people")
public class MissingPeopleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "missing_people_id")
    private Long id;

    @NotBlank
    private String name;

    private String profileImage;

    @PastOrPresent
    private LocalDate birthdate;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Past
    private LocalDateTime missingAt;

    @PastOrPresent
    private LocalDateTime registrationAt;

    @NotBlank
    private String missingLocation;

    @NotNull
    private String description;

    private String koQuery; //착장정보 한국어 쿼리
    private String query; //착장정보 영어쿼리

    @Enumerated(EnumType.STRING)
    private Status status; //실종자의 현재 탐색 단계
    // @Enumerated(EnumType.STRING)
    // private PoliceStation policeStation;


    @OneToOne(mappedBy = "missingPeopleEntity", cascade = CascadeType.ALL)
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

    public void addSearchHistoryEntities(SearchHistoryEntity searchHistoryEntity) {
        if (this.searchHistoryEntities == null) {
            this.searchHistoryEntities = new ArrayList<>();
        }
        this.searchHistoryEntities.add(searchHistoryEntity);
    }
}
