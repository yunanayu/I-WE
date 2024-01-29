package com.iandwe.record.repository;

import com.iandwe.record.domain.MotherRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MotherRecordRepository extends JpaRepository<MotherRecord, Long> {

    List<MotherRecord> findAllByNum(Long num);

    Optional<MotherRecord> findByNum(Long num);
}
