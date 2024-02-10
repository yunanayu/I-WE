package com.iandwe.record.service;

public interface GrowthService {

    String getHeightPercentile(int month, float height);

    String getWeightPercentile(int month, float weight);

}
