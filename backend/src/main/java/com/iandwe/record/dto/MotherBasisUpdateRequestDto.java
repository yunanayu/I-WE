package com.iandwe.record.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MotherBasisUpdateRequestDto {

    // 엄마번호
    private Long motherNum;

    // 임신직전몸무게
    private float basisWeight;

    // 키
    private float height;
}
