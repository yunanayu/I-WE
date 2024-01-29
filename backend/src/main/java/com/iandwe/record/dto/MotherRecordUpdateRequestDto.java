package com.iandwe.record.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class MotherRecordUpdateRequestDto {

    // 엄마기록번호
    private Long num;

    // 몸무게
    private float weight;

    // 기록날짜
    private LocalDate recordDate;
}
