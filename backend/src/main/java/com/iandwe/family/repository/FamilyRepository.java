package com.iandwe.family.repository;

import com.iandwe.family.domain.Family;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FamilyRepository extends JpaRepository<Family, Long>{

    Optional<Family> findByMother(long mother);

    Optional<Family> findByShareCode(String shareCode);

    Family findByNum(Long num);

    Long findFatherByNum(Long num);
}