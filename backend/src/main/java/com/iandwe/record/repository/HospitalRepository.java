package com.iandwe.record.repository;

import com.iandwe.record.domain.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HospitalRepository extends JpaRepository<Hospital, Long> {

    List<Hospital> findAllByTargetAndTargetNum(String target, long targetNum);

    Optional<Hospital> findByNum(long num);
}
