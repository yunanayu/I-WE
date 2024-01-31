package com.iandwe.record.dto;

import com.iandwe.record.domain.MotherBasis;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MotherBasisCreateRequestDto {

    // 엄마번호
    private Long motherNum;

    // 임신직전몸무게
    private float basisWeight;

    // 키
    private float height;

    public MotherBasis toEntity() {
        return MotherBasis.builder()
                .motherNum(motherNum)
                .height(height)
                .basisWeight(basisWeight)
                .build();
    }
}
