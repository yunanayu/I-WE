package com.iandwe.baby.repository;

import com.iandwe.baby.domain.Baby;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BabyRepository extends JpaRepository<Baby, Long> {

    @Query("SELECT b FROM Baby b WHERE b.motherNum = :num OR b.fatherNum = :num")
    List<Baby> findByMotherNumOrFatherNum(@Param("num") long num);

    Optional<Baby> findByNum(Long num);

    void deleteByNum(long babyNum);
}
