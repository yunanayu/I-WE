package com.iandwe.info.repository;

import com.iandwe.info.domain.Info;
import com.iandwe.info.dto.InfoRequestDto;
import org.kurento.client.internal.server.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InfoRepository extends JpaRepository<Info, Long> {

//    @Query("SELECT i FROM Info i " +
//            "WHERE i.target = :#{#dto.target} " +
//                "AND i.category = :#{#dto.category} " +
//                "AND CAST(substring(i.startTime, 2) AS Integer) <= CAST(substring(:#{#dto.targetTime}, 2) AS Integer) " +
//                "AND CAST(substring(:#{#dto.targetTime}, 2) AS Integer) <= CAST(substring(i.endTime, 2) AS Integer) ")
    @Query("SELECT i FROM Info i " +
            "WHERE i.target = :#{#dto.target} " +
            "AND i.category = :#{#dto.category} " +
            "AND substring(i.startTime, 1, 1) = substring(:#{#dto.targetTime}, 1, 1)" +
            "AND CAST(substring(i.startTime, 2) AS Integer) <= CAST(substring(:#{#dto.targetTime}, 2) AS Integer) " +
            "AND CAST(substring(:#{#dto.targetTime}, 2) AS Integer) <= CAST(substring(i.endTime, 2) AS Integer) ")
    List<Info> findByTargetAndTargetTimeAndCategory(@Param("dto")InfoRequestDto dto);

    String findByNum(Long num);
}
