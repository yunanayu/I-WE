package com.iandwe.record.dto;

import com.iandwe.record.domain.MotherRecord;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MotherRecordCreateRequestDto {

    // 엄마번호
    private Long motherNum;

    // 몸무게
    private float weight;

    // 기록날짜
    private LocalDate recordDate;

    public MotherRecord toEntity() {
        return MotherRecord.builder()
                .motherNum(motherNum)
                .weight(weight)
                .recordDate(recordDate)
                .build();
    }
}
