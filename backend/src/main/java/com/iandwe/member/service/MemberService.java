package com.iandwe.member.service;

import com.iandwe.member.domain.Member;
import com.iandwe.member.dto.request.MemberRegisterDto;
import jakarta.transaction.Transactional;

import java.util.Optional;

@Transactional
public interface MemberService {
    Optional<Member> findByEmail(String email);

    Member save(MemberRegisterDto memberRegisterDto);
}
