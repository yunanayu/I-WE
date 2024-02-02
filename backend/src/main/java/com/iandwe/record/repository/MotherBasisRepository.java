package com.iandwe.record.repository;

import com.iandwe.record.domain.MotherBasis;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MotherBasisRepository extends JpaRepository<MotherBasis, Long> {

    Optional<MotherBasis> findByMotherNum(long motherNum);
}
