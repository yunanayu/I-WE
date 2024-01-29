package com.iandwe.member.dto.request;

import com.iandwe.member.domain.Member;
import com.iandwe.member.domain.MemberRole;
import com.iandwe.member.domain.ParentType;
import com.iandwe.member.domain.PlatformType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class MemberRegisterDto {

    @NotBlank
    @Email
    private String email;

    private String memberId;

    private String name;

    private String password;

    private String profileImage;

    private ParentType parentType;

    private Long familyNum;

    private String fcmToken;

    public Member toEntity() {
        return Member.builder()
                .email(email)
                .memberId(memberId)
                .name(name)
                .password(password)
                .role(MemberRole.USER)
                .platform(PlatformType.NONE)
                .parentType(parentType)
                .fcmToken(fcmToken)
                .familyNum(familyNum)
                .profileImage(profileImage)
                .build();
    }

}
