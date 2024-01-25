package com.iandwe.member.service;

import com.iandwe.member.domain.Member;
import com.iandwe.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;

//    private final PasswordEncoder passwordEncoder;

    @Override
    public Optional<Member> findByEmail(String email) {
        Optional<Member> result = memberRepository.findByEmail(email);

        return result;
    }
}
