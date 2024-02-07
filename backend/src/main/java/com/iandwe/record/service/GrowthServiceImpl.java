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
import java.util.Optional;

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

        List<Float> height25thPercentiles = new ArrayList<>();
        List<Float> height75thPercentiles = new ArrayList<>();

        List<Float> weight25thPercentiles = new ArrayList<>();
        List<Float> weight75thPercentiles = new ArrayList<>();

        List<Float> circumference25thPercentiles = new ArrayList<>();
        List<Float> circumference75thPercentiles = new ArrayList<>();

        for (GrowthHeight growthHeight : growthHeights) {
            height25thPercentiles.add(growthHeight.getHeights().get(7));
            height75thPercentiles.add(growthHeight.getHeights().get(5));
        }
        for (GrowthWeight growthWeight : growthWeights) {
            weight25thPercentiles.add(growthWeight.getWeights().get(7));
            weight75thPercentiles.add(growthWeight.getWeights().get(5));
        }
        for (GrowthCircumference growthCircumference : growthCircumferences) {
            circumference25thPercentiles.add(growthCircumference.getCircumferences().get(7));
            circumference75thPercentiles.add(growthCircumference.getCircumferences().get(5));
        }

        dto.setHeightPercentile(heightPercentile);
        dto.setWeightPercentile(weightPercentile);
        dto.setCircumferencePercentile(circumferencesPercentile);

        dto.setHeight25thPercentiles(height25thPercentiles);
        dto.setHeight75thPercentiles(height75thPercentiles);
        dto.setWeight25thPercentiles(weight25thPercentiles);
        dto.setWeight75thPercentiles(weight75thPercentiles);
        dto.setCircumference25thPercentiles(circumference25thPercentiles);
        dto.setCircumference75thPercentiles(circumference75thPercentiles);

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
