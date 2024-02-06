package com.iandwe.record.service;

import com.iandwe.record.domain.GrowthHeight;
import com.iandwe.record.domain.GrowthWeight;
import com.iandwe.record.dto.GrowthResponseDto;
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

    @Override
    public GrowthResponseDto findPercentiles(int gender, int month, float height, float weight) {

        List<GrowthHeight> growthHeights = growthHeightRepository.findAllByGenderAndMonth(gender, month);

        List<GrowthWeight> growthWeights = growthWeightRepository.findAllByGenderAndMonth(gender, month);

        GrowthResponseDto dto = new GrowthResponseDto();

        int heightPercentile = checkPercentile(height, growthHeights.get(0).getHeights());

        int weightPercentile = checkPercentile(weight, growthWeights.get(0).getWeights());

        List<Float> height25thPercentiles = new ArrayList<>();

        List<Float> height75thPercentiles = new ArrayList<>();

        List<Float> weight25thPercentiles = new ArrayList<>();

        List<Float> weight75thPercentiles = new ArrayList<>();

        for (GrowthHeight growthHeight : growthHeights) {
            height25thPercentiles.add(growthHeight.getHeights().get(7));
            height75thPercentiles.add(growthHeight.getHeights().get(5));
        }
        for (GrowthWeight growthWeight : growthWeights) {
            weight25thPercentiles.add(growthWeight.getWeights().get(7));
            weight75thPercentiles.add(growthWeight.getWeights().get(5));
        }

        dto.setHeightPercentile(heightPercentile);

        dto.setWeightPercentile(weightPercentile);

        dto.setHeight25thPercentiles(height25thPercentiles);
        dto.setHeight75thPercentiles(height75thPercentiles);
        dto.setWeight25thPercentiles(weight25thPercentiles);
        dto.setWeight75thPercentiles(weight75thPercentiles);

        return dto;
    }

    private static int checkPercentile(float target, List<Float> list) {

        int[] percentile = {99, 97, 95, 90, 85, 75, 50, 25, 15, 10, 5, 3, 1};

        for (int i = 0; i < list.size(); i++) {
            if (target < list.get(i)) {
                return percentile[i];
            }
        }
        return 1;
    }
}
