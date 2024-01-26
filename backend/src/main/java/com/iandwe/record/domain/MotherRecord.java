package com.iandwe.record.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class MotherRecord {

    // 엄마기록번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;


    // Todo : join
    // 엄마번호
    @JoinColumn(name = "")
    private Long motherNum;

    // 몸무게
    private float weight;

    //키
    private float height;

    // 기록날짜
    private LocalDate recordDate;
}
