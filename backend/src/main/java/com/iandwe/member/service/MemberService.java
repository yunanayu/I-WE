package com.iandwe.member.service;

import com.iandwe.member.domain.Member;
import com.iandwe.member.dto.request.RegisterDto;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Transactional
public interface MemberService {
    Optional<Member> findByEmail(String email);

    Member save(RegisterDto registerDto);
}
