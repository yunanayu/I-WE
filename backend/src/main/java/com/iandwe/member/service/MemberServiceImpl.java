package com.iandwe.member.service;

import com.iandwe.checker.service.generator.CheckerGenerator;
import com.iandwe.member.domain.Member;
import com.iandwe.member.domain.ParentType;
import com.iandwe.member.dto.request.MemberRegisterDto;
import com.iandwe.member.dto.request.MemberUpdateFcmTokenDto;
import com.iandwe.member.dto.response.MemberInfoDto;
import com.iandwe.member.exception.NoMemberExistException;
import com.iandwe.member.repository.MemberRepository;
import com.iandwe.security.SecurityUtils;
import com.iandwe.security.service.JwtUtil;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

//    private final PasswordEncoder passwordEncoder;

    @Override
    public Optional<Member> findByEmail(String email) {
        Optional<Member> result = memberRepository.findByEmail(email);

        return result;
    }

    @Override
    public Member save(MemberRegisterDto memberRegisterDto) {
        // 이메일로 회원을 조회해서 이미 있다면 예외발생
        memberRepository.findByEmail(memberRegisterDto.getEmail())
                .ifPresent(member -> {
                    throw new IllegalArgumentException("이미 존재하는 회원입니다.");
                });

        Member member = memberRegisterDto.toEntity();

        // 회원을 저장함
        Member savedMember = memberRepository.save(member);

        return savedMember;
    }

    @Override
    public void updateFcmToken(MemberUpdateFcmTokenDto memberUpdateFcmTokenDto) {
        memberUpdateFcmTokenDto.updateEmail(SecurityUtils.getUserEmail());

        // 소셜 로그인일 경우(이메일)
        if(memberUpdateFcmTokenDto.getEmail() != null) {
            Optional<Member> result = memberRepository.findByEmail(memberUpdateFcmTokenDto.getEmail());

            if(!result.isPresent()) {
                throw new NoMemberExistException();
            }

            result.get().updateFcmToken(memberUpdateFcmTokenDto.getFcmToken());
            memberRepository.save(result.get());
        }

    }

    @Override
    public MemberInfoDto findByAccessToken(String accessToken) {
        String email = JwtUtil.getUid(accessToken);

        Member member = memberRepository.findByEmail(email).orElseThrow(NoMemberExistException::new);
        MemberInfoDto memberInfoDto = MemberInfoDto.from(member);

        return memberInfoDto;
    }

    @Override
    public void updateParentType(Long num, String parentType) {
        Member member = memberRepository.findById(num).orElseThrow(NoMemberExistException::new);

        member.updateParentType(parentType);

        memberRepository.save(member);
    }

}
