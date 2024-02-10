package com.iandwe.record.service;

import com.iandwe.record.domain.GrowthCircumference;
import com.iandwe.record.domain.GrowthHeight;
import com.iandwe.record.domain.GrowthWeight;
import com.iandwe.record.dto.GrowthResponseDto;
import com.iandwe.record.repository.GrowthCircumferenceRepository;
import com.iandwe.record.repository.GrowthHeightRepository;
import com.iandwe.record.repository.GrowthWeightRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GrowthServiceImpl implements GrowthService {

    private final GrowthHeightRepository growthHeightRepository;

    private final GrowthWeightRepository growthWeightRepository;

    private final GrowthCircumferenceRepository growthCircumferenceRepository;

    @Override
    public GrowthResponseDto findPercentiles(int gender, int month, float height, float weight, float circumference) {

        List<GrowthHeight> growthHeights = growthHeightRepository.findAllByGenderAndMonth(gender, month);

        List<GrowthWeight> growthWeights = growthWeightRepository.findAllByGenderAndMonth(gender, month);

        List<GrowthCircumference> growthCircumferences = growthCircumferenceRepository.findAllByGenderAndMonth(gender, month);

        GrowthResponseDto dto = new GrowthResponseDto();

        int heightPercentile = checkPercentile(height, growthHeights.get(0).getHeights());
        int weightPercentile = checkPercentile(weight, growthWeights.get(0).getWeights());
        int circumferencesPercentile = checkPercentile(circumference, growthCircumferences.get(0).getCircumferences());

        List<Float> height1stPercentiles = new ArrayList<>();
        List<Float> height25thPercentiles = new ArrayList<>();
        List<Float> height75thPercentiles = new ArrayList<>();
        List<Float> height99thPercentiles = new ArrayList<>();

        List<Float> weight1stPercentiles = new ArrayList<>();
        List<Float> weight25thPercentiles = new ArrayList<>();
        List<Float> weight75thPercentiles = new ArrayList<>();
        List<Float> weight99thPercentiles = new ArrayList<>();

        List<Float> circumference1stPercentiles = new ArrayList<>();
        List<Float> circumference25thPercentiles = new ArrayList<>();
        List<Float> circumference75thPercentiles = new ArrayList<>();
        List<Float> circumference99thPercentiles = new ArrayList<>();

        for (GrowthHeight growthHeight : growthHeights) {
            height1stPercentiles.add(growthHeight.getHeights().get(12));
            height25thPercentiles.add(growthHeight.getHeights().get(7));
            height75thPercentiles.add(growthHeight.getHeights().get(5));
            height99thPercentiles.add(growthHeight.getHeights().get(1));
        }
        for (GrowthWeight growthWeight : growthWeights) {
            weight1stPercentiles.add(growthWeight.getWeights().get(12));
            weight25thPercentiles.add(growthWeight.getWeights().get(7));
            weight75thPercentiles.add(growthWeight.getWeights().get(5));
            weight99thPercentiles.add(growthWeight.getWeights().get(1));
        }
        for (GrowthCircumference growthCircumference : growthCircumferences) {
            circumference1stPercentiles.add(growthCircumference.getCircumferences().get(12));
            circumference25thPercentiles.add(growthCircumference.getCircumferences().get(7));
            circumference75thPercentiles.add(growthCircumference.getCircumferences().get(5));
            circumference99thPercentiles.add(growthCircumference.getCircumferences().get(1));
        }

        dto.setHeightPercentile(heightPercentile);
        dto.setWeightPercentile(weightPercentile);
        dto.setCircumferencePercentile(circumferencesPercentile);

        dto.setHeight1stPercentiles(height1stPercentiles);
        dto.setHeight25thPercentiles(height25thPercentiles);
        dto.setHeight75thPercentiles(height75thPercentiles);
        dto.setHeight99thPercentiles(height99thPercentiles);

        dto.setWeight1stPercentiles(weight1stPercentiles);
        dto.setWeight25thPercentiles(weight25thPercentiles);
        dto.setWeight75thPercentiles(weight75thPercentiles);
        dto.setWeight99thPercentiles(weight99thPercentiles);

        dto.setCircumference1stPercentiles(circumference1stPercentiles);
        dto.setCircumference25thPercentiles(circumference25thPercentiles);
        dto.setCircumference75thPercentiles(circumference75thPercentiles);
        dto.setCircumference99thPercentiles(circumference99thPercentiles);

        return dto;
    }

    private static int checkPercentile(float target, List<Float> list) {

        int[] percentile = {99, 97, 95, 90, 85, 75, 50, 25, 15, 10, 5, 3, 1};

        int i = list.size() - 1;

        while (target < list.get(i) && i > 0) {
            i--;
        }
        return percentile[i];
    }
}
