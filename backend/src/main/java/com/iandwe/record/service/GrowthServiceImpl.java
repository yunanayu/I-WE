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

        GrowthResponseDto dto = new GrowthResponseDto();

        Optional<GrowthHeight> growthHeight = growthHeightRepository.findByGenderAndMonth(gender, month);

        Optional<GrowthWeight> growthWeight = growthWeightRepository.findByGenderAndMonth(gender, month);

        return null;
    }
}
