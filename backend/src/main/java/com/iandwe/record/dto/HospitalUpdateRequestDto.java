package com.iandwe.record.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class HospitalUpdateRequestDto {

    private Long num;

    // 대상 : 산모 or 아이
    private String target;

    // 대상번호
    private Long targetNum;

    // 검진목적 (간편정보에 보일 문장)
    private String title;

    // 진료병원
    private String hospitalName;

    // 담당의
    private String doctor;

    // 검진날짜
    private LocalDate hospitalDate;

    // 검진내용
    private String content;

    // 검진결과
    private String result;

    // 의사소견
    private String comment;
}
