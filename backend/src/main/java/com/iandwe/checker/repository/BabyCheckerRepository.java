package com.iandwe.checker.repository;

import com.iandwe.checker.domain.BabyChecker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BabyCheckerRepository extends JpaRepository<BabyChecker, Long> {

    List<BabyChecker> findByBabyNum(long babyNum);

    Optional<BabyChecker> findByBabyNumAndEssentialNum(long babyNum, long essentialNum);

}
