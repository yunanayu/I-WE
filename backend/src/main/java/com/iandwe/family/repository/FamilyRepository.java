package com.iandwe.family.repository;

import com.iandwe.family.domain.Family;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface FamilyRepository extends JpaRepository<Family, Long>{

    Optional<Family> findByMother(long mother);

    Optional<Family> findByShareCode(String shareCode);

    Family findByNum(Long num);

    @Query("select f.father from Family f where f.num = :num")
    Long findFatherByNum(Long num);
}