package com.iandwe.record.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GrowthResponseDto {

    private int heightPercentile;

    private int weightPercentile;

    private List<Float> height25thPercentiles;

    private List<Float> height75thPercentiles;

    private List<Float> weight25thPercentiles;

    private List<Float> weight75thPercentiles;
}
