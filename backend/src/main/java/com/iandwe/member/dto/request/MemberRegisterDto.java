package com.iandwe.member.dto.request;

import com.iandwe.member.domain.Member;
import com.iandwe.member.domain.PlatformType;
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
    private String email;
//    @NotBlank
//    private String address;
    @NotBlank
    private String name;
    @NotBlank
    private String provider;
//    private Integer imgNo;
//    private String imgUrl;

    public Member toEntity() {
        return Member.builder()
                .email(email)
                .name(name)
                .platform(PlatformType.valueOf(provider))
                .build();
    }

}