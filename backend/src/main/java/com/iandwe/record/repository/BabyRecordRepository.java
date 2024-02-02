package com.iandwe.record.repository;

import com.iandwe.record.domain.BabyRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BabyRecordRepository extends JpaRepository<BabyRecord, Long> {

    List<BabyRecord> findAllByBabyNum(long babyNum);

    Optional<BabyRecord> findByNum(long num);
}
