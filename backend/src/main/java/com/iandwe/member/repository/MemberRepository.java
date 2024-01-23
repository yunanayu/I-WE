package com.iandwe.member.repository;

import com.iandwe.member.domain.Member;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    //    @EntityGraph(attributePaths = {"memberStatusList"})
    @Query("select m from Member m where m.memberId = :memberId")
    Member getWithStatus(@Param("memberId") String memberId);

    Optional<Member> findByMemberId(String memberId);
}
