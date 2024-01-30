package com.iandwe.record.domain;

import com.iandwe.record.dto.MotherBasisUpdateRequestDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class MotherBasis {

    // 엄마기준기록번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    // TODO : join
    // @JoinColumn(name = "")
    // 엄마번호
    private Long motherNum;

    // 임신직전몸무게
    private float basisWeight;

    // 키
    private float height;

    public void update(MotherBasisUpdateRequestDto dto) {
        if (dto.getMotherNum() != null) {
            this.motherNum = dto.getMotherNum();
        }
        if (dto.getBasisWeight() != 0.0F) {
            this.basisWeight = dto.getBasisWeight();
        }
        if (dto.getHeight() != 0.0F) {
            this.height = dto.getHeight();
        }
    }
}
