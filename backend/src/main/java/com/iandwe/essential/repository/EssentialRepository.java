package com.iandwe.essential.repository;

import com.iandwe.essential.domain.Essential;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EssentialRepository extends JpaRepository<Essential, Long> {

    // 1. 아이의 필수 검사 정보 조회
    // 2. 산모의 필수 검사 정보 조회
    // 3. 모든 필수 검사 정보 조회
    List<Essential> findByTarget(String target);
    // 4. 시기별 검사 정보 조회

    List<Essential> findByTargetTime(int targetTime);

}
