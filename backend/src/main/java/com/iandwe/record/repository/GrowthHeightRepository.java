package com.iandwe.record.repository;

import com.iandwe.record.domain.GrowthHeight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GrowthHeightRepository extends JpaRepository<GrowthHeight, Long> {

    GrowthHeight findByGenderAndMonth(int gender, int month);
}
