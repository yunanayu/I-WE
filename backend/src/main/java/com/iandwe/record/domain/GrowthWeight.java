package com.iandwe.record.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GrowthWeight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int num;

    private int gender;

    private int month;

    private float p1;

    private float p3;

    private float p5;

    private float p10;

    private float p15;

    private float p25;

    private float p50;

    private float p75;

    private float p85;

    private float p90;

    private float p95;

    private float p97;

    private float p99;

}
