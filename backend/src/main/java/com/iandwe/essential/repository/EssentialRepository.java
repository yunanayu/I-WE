package com.iandwe.essential.repository;

import com.iandwe.essential.domain.Essential;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EssentialRepository extends JpaRepository<Essential, Long> {

    List<Essential> findByTarget(String target);

    Optional<Essential> findByNum(long num);

}
