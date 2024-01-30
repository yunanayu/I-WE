package com.iandwe.record.dto;

import com.iandwe.record.domain.MotherBasis;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class MotherBasisReadResponseDto {

    // 엄마번호
    private Long motherNum;

    // 임신직전몸무게
    private float basisWeight;

    // 키
    private float height;

    public static MotherBasisReadResponseDto from(MotherBasis motherBasis) {
        return MotherBasisReadResponseDto.builder()
                .motherNum(motherBasis.getMotherNum())
                .basisWeight(motherBasis.getBasisWeight())
                .height(motherBasis.getHeight())
                .build();
    }
}
