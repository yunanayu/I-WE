package com.iandwe.record.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GrowthResponseDto {

    private int heightPercentile;

    private int weightPercentile;

    private int circumferencePercentile;

    private List<Float> height1stPercentiles;
    private List<Float> height25thPercentiles;
    private List<Float> height75thPercentiles;
    private List<Float> height99thPercentiles;

    private List<Float> weight1stPercentiles;
    private List<Float> weight25thPercentiles;
    private List<Float> weight75thPercentiles;
    private List<Float> weight99thPercentiles;

    private List<Float> circumference1stPercentiles;
    private List<Float> circumference25thPercentiles;
    private List<Float> circumference75thPercentiles;
    private List<Float> circumference99thPercentiles;
}
