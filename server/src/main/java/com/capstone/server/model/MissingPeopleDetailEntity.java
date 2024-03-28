package com.capstone.server.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "MissingPeopleDetail")
public class MissingPeopleDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long MissingPeopleDetailId;

    @NotBlank
    private String topCategory;

    @NotBlank
    private String topColor;

    @NotBlank
    private String bottomCategory;

    @NotBlank
    private String bottomColor;

    @NotBlank
    private String bagCategory;

    @NotBlank
    private String bagColor;

    @NotBlank
    private String shoeCategory;

    @NotBlank
    private String shoeColor;

    @NotBlank
    private String hairLength;

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
