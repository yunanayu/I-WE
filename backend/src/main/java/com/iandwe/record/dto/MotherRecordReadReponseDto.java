package com.iandwe.record.dto;

import com.iandwe.record.domain.MotherRecord;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MotherRecordReadReponseDto {

    // 엄마기록번호
    private Long num;

    // 엄마번호
    private Long motherNum;

    // 몸무게
    private float weight;

    // 기록날짜
    private LocalDate recordDate;

    public static MotherRecordReadReponseDto from(MotherRecord motherRecord) {
        return MotherRecordReadReponseDto.builder()
                .num(motherRecord.getNum())
                .motherNum(motherRecord.getMotherNum())
                .weight(motherRecord.getWeight())
                .recordDate(motherRecord.getRecordDate())
                .build();
    }
}
