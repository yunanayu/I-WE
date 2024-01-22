package com.iandwe.member.service;

import java.util.stream.Collectors;

import com.iandwe.member.domain.Member;
import com.iandwe.member.dto.MemberDto;
import org.springframework.transaction.annotation.Transactional;


@Transactional
public interface MemberService {

    MemberDto getKakaoMember(String accessToken);

//    void modifyMember(MemberModifyDTO memberModifyDTO);
//
    default MemberDto entityToDto(Member member) {

        MemberDto dto = new MemberDto(
                member.getNum(),
                member.getMemberId(),
                member.getName(),
                member.getPassword(),
                member.getSalt(),
                member.getEmailId(),
                member.getEmailDomain(),
                member.getBirth(),
                member.getPhone(),
                member.getAddress(),
                member.isLoginType(),
                member.isParentType(),
                member.getProfileImage(),
                member.getJoinDate(),
                member.getStatus());
        return dto;
    }

}