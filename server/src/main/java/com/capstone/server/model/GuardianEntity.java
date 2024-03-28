package com.capstone.server.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "Guardian")
public class GuardianEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long guardianId;

    @NotBlank
    private String guardianName;

    @NotBlank
    private String guardianPhoneNumber;

    @NotBlank
    private String guardianRelationship;

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
