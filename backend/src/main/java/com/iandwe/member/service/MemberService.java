package com.iandwe.member.service;

import com.iandwe.member.domain.Member;
import com.iandwe.member.dto.request.MemberRegisterDto;
import com.iandwe.member.dto.request.MemberUpdateFcmTokenDto;
import com.iandwe.member.dto.response.MemberInfoDto;
import jakarta.transaction.Transactional;

import java.util.Optional;

@Transactional
public interface MemberService {
    Optional<Member> findByEmail(String email);

    Member save(MemberRegisterDto memberRegisterDto);

    void updateFcmToken(MemberUpdateFcmTokenDto memberUpdateFcmTokenDto);

    MemberInfoDto findByAccessToken(String accessToken);

    void updateParentType(Long num, String parentType);
}
