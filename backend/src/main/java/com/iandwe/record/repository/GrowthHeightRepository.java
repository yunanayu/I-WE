package com.iandwe.record.repository;

import com.iandwe.record.domain.GrowthHeight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GrowthHeightRepository extends JpaRepository<GrowthHeight, Long> {

    Optional<GrowthHeight> findByGenderAndMonth(int gender, int month);
}
