package com.iandwe.member.dto.request;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MemberUpdateFcmTokenDto {

    @Email
    private String email;

    private String memberId;

    private String fcmToken;

    public void updateEmail(String email) {
        this.email = email;
    }
}
