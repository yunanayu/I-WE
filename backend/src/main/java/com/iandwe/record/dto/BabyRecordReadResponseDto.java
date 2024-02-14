package com.iandwe.record.dto;

import com.iandwe.record.domain.BabyRecord;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BabyRecordReadResponseDto {

    // 아이기록번호
    private Long num;

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
    private List<String> images;

    public static BabyRecordReadResponseDto from(BabyRecord babyRecord) {
        return BabyRecordReadResponseDto.builder()
                .num(babyRecord.getNum())
                .babyNum(babyRecord.getBabyNum())
                .height(babyRecord.getHeight())
                .weight(babyRecord.getWeight())
                .circumference(babyRecord.getCircumference())
                .recordDate(babyRecord.getRecordDate())
                .images(babyRecord.getImages())
                .build();
    }
}
