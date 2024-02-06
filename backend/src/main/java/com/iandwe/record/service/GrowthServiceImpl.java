package com.iandwe.record.service;

import com.iandwe.record.domain.GrowthHeight;
import com.iandwe.record.domain.GrowthWeight;
import com.iandwe.record.dto.GrowthResponseDto;
import com.iandwe.record.repository.GrowthHeightRepository;
import com.iandwe.record.repository.GrowthWeightRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GrowthServiceImpl implements GrowthService {

    private final GrowthHeightRepository growthHeightRepository;

    private final GrowthWeightRepository growthWeightRepository;

    @Override
    public GrowthResponseDto getPercentile(int gender, int month, float height, float weight) {

        Optional<GrowthHeight> growthHeight = growthHeightRepository.findByGenderAndMonth(gender, month);

        int heightPercentile = getPercentile(height, growthHeight.get().getHeights());

        Optional<GrowthWeight> growthWeight = growthWeightRepository.findByGenderAndMonth(gender, month);

        int weightPercentile = getPercentile(weight, growthWeight.get().getWeights());

        return new GrowthResponseDto(heightPercentile, weightPercentile);
    }

    private static int getPercentile(float target, List<Float> list) {

        int[] percentile = {99, 97, 95, 90, 85, 75, 50, 25, 15, 10, 5, 3, 1};

        for(int i=0;i<list.size();i++){
            if(target < list.get(i)){
                return percentile[i];
            }
        }
        return 1;
    }
}
