package com.iandwe.record.service;

import com.iandwe.record.dto.GrowthResponseDto;

public interface GrowthService {

    public GrowthResponseDto getPercentile(int gender, int month, float height, float weight);
}
