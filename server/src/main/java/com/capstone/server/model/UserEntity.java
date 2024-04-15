package com.capstone.server.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import com.capstone.server.model.enums.userEnum;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "test_user")
@EntityListeners(AuditingEntityListener.class)
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String name;


    private Integer age;


    private String email;

    private BigDecimal latitude;

    private BigDecimal longitude;

    private userEnum userEnum;


    private Date createdAt;


    private Date updatedAt;

    @CreatedDate
    private LocalDateTime localDate;


    private LocalDateTime whenCreatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
        updatedAt = new Date();
        localDate = LocalDateTime.now();
    }

    @PreUpdate // 업데이트가 발생할 때 호출되는 메소드
    protected void onUpdate() {
        updatedAt = new Date();
    }

}
