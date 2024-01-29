package com.iandwe.record.dto;

import java.time.LocalDate;

public class BabyRecordCreateRequestDto {

    // 아이번호
    private Long babyNum;

    // 키
    private float height;

    // 몸무게
    private float weight;

    // 머리둘레
    private float circumference;

    // 날짜
    private LocalDate recordDate;

    // 사진
    private String babyImage;
}
