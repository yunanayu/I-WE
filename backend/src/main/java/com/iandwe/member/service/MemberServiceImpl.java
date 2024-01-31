package com.iandwe.member.service;

import com.iandwe.checker.service.generator.CheckerGenerator;
import com.iandwe.member.domain.Member;
import com.iandwe.member.domain.ParentType;
import com.iandwe.member.dto.request.MemberRegisterDto;
import com.iandwe.member.dto.request.MemberUpdateFcmTokenDto;
import com.iandwe.member.exception.NoMemberExistException;
import com.iandwe.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    private final CheckerGenerator checkerGenerator;

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

        if (isMother(savedMember.getParentType())) {
            checkerGenerator.generateMotherCheckerData(savedMember.getNum());
        }

        return savedMember;
    }

    @Override
    public void updateFcmToken(MemberUpdateFcmTokenDto memberUpdateFcmTokenDto) {
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

    private static boolean isMother(ParentType type) {
        return type.equals(ParentType.MOTHER);
    }
}
