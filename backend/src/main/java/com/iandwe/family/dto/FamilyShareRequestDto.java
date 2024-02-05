package com.iandwe.family.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FamilyShareRequestDto {

    private String code;

    private long babyNum;

    private long fatherNum;

}
