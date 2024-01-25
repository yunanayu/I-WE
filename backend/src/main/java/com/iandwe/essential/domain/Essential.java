package com.iandwe.essential.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Essential {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    private String title;

    private String description;

    private int targetTime;

    private String target;

    private String category;
}
