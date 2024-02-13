package com.iandwe.checker.repository;

import com.iandwe.checker.domain.MotherChecker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MotherCheckerRepository extends JpaRepository<MotherChecker, Long> {

    List<MotherChecker> findByMotherNum(long motherNum);

    Optional<MotherChecker> findByMotherNumAndEssentialNumAndBabyNum(long motherNum, long essentialNum, long babyNum);

}
