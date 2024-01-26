package com.iandwe.record.repository;

import com.iandwe.record.domain.BabyRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BabyRecordRepository extends JpaRepository<BabyRecord, Long> {

}
