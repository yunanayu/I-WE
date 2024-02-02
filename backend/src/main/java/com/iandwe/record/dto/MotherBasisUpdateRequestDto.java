package com.iandwe.record.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MotherBasisUpdateRequestDto {

    // 엄마번호
    private Long motherNum;

    // 임신직전몸무게
    private float basisWeight;

    // 키
    private float height;
    public static MotherBasisUpdateRequestDto from(MotherBasisCreateRequestDto dto){
        return MotherBasisUpdateRequestDto.builder()
                .motherNum(dto.getMotherNum())
                .basisWeight(dto.getBasisWeight())
                .height(dto.getHeight())
                .build();
    }
}
