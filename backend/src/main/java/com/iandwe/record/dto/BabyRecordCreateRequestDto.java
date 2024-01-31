package com.iandwe.record.dto;

import com.iandwe.record.domain.BabyRecord;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

    public BabyRecord toEntity() {
        return BabyRecord.builder()
                .babyNum(babyNum)
                .height(height)
                .weight(weight)
                .circumference(circumference)
                .recordDate(recordDate)
                .babyImage(babyImage)
                .build();
    }
}
