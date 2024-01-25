package com.iandwe.member.dto.request;

import com.iandwe.member.domain.Member;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Builder
@AllArgsConstructor
public class RegisterDto {

    @NotBlank
    private String email;
//    @NotBlank
//    private String address;
    @NotBlank
    private String nickname;
    @NotBlank
    private String provider;
//    private Integer imgNo;
//    private String imgUrl;

    public Member toEntity() {
        return Member.builder()
                .email(email)
                .nickname(nickname)
                .platform(provider)
                .regDate(LocalDateTime.now())
                .build();
    }

}