package com.iandwe.baby.repository;

import com.iandwe.baby.domain.Baby;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BabyRepository extends JpaRepository<Baby, Long> {

    @Query("SELECT m FROM Member m WHERE m.motherNum = :userNum OR m.fatherNum = :userNum")
    List<Baby> findAllByUserNum(long userNum);

    Optional<Baby> findByNum(long num);
}
