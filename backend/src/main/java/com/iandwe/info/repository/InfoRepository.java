package com.iandwe.info.repository;

import com.iandwe.info.domain.Info;
import com.iandwe.info.dto.InfoRequestDto;
import org.kurento.client.internal.server.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InfoRepository extends JpaRepository<Info, Long> {

    // TODO
    //  targetTime 적용 전 (임시)
    //  정보 갯수 exception -> param cnt 삭제 -> 현재 불필요
    @Query("SELECT i FROM Info i WHERE i.target = :#{#dto.target} AND i.targetTime = :#{#dto.targetTime} AND i.category = :#{#dto.category}")
    List<Info> findByTargetAndTargetTimeAndCategory(@Param("dto") InfoRequestDto dto);

    String findByNum(Long num);
}
