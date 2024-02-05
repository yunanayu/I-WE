package com.iandwe.record.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class GrowthResponseDto {

    private int heightPercentile;

    private int weightPercentile;
}
