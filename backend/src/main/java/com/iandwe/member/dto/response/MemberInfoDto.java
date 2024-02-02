package com.iandwe.member.dto.response;

import com.iandwe.member.domain.Member;
import com.iandwe.member.domain.MemberRole;
import com.iandwe.member.domain.ParentType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MemberInfoDto {

    private Long num;

    private String email;

    private String memberId;

    private String name;

    private String parentType; // MOTHER, FATHER

    private String profileImage;

    public static MemberInfoDto from(Member member) {
        return MemberInfoDto.builder()
                .num(member.getNum())
                .email(member.getEmail())
                .memberId(member.getMemberId())
                .name(member.getName())
                .parentType(member.getParentType() == null ? null :  member.getParentType().name())
                .profileImage(member.getProfileImage())
                .build();
    }

}
