package com.iandwe.record.repository;

import com.iandwe.record.domain.GrowthWeight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GrowthWeightRepository extends JpaRepository<GrowthWeight, Long>  {
    Optional<GrowthWeight> findByGenderAndMonth(int gender, int month);
}
