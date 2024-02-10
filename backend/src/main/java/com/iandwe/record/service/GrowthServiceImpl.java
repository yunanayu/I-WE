package com.iandwe.record.service;

import com.iandwe.record.dto.GrowthResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GrowthServiceImpl implements GrowthService{

    private final GrowthRepository growthRepository;

    @Override
    public String getHeightPercentile(int month,float height) {
        GrowthResponseDto dto = growthRepository.findByMonth(month);
        
        return null;
    }

    @Override
    public String getWeightPercentile(int month,float weight) {
        return null;
    }
}
