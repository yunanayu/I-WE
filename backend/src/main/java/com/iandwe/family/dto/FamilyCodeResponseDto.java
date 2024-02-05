package com.iandwe.family.dto;

import com.iandwe.family.domain.Family;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class FamilyCodeResponseDto {

    String code;

    public static FamilyCodeResponseDto from(Family family){
        return FamilyCodeResponseDto.builder()
                .code(family.getShareCode())
                .build();
    }
}
