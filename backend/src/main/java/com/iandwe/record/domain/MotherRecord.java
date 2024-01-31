package com.iandwe.record.domain;

import com.iandwe.record.dto.MotherRecordUpdateRequestDto;
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
    // @JoinColumn(name = "")
    // 엄마번호
    private Long motherNum;

    // 몸무게
    private float weight;

    // 기록날짜
    private LocalDate recordDate;

    public void update(MotherRecordUpdateRequestDto dto) {
        if (dto.getNum() != null) {
            this.num = dto.getNum();
        }
        if (dto.getWeight() != 0.0F) {
            this.weight = dto.getWeight();
        }
        if (dto.getRecordDate() != null) {
            this.recordDate = dto.getRecordDate();
        }
    }
}
