package com.iandwe.alarm.fcm.dto;

import com.iandwe.cheat.dto.request.CheatRequestDto;
import com.iandwe.essential.domain.Essential;
import com.iandwe.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static com.iandwe.alarm.fcm.util.FCMGenerator.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class FCMDto {

    private String fcmToken;

    private String title;

    private String body;

    private String key;

    public static FCMDto of(Member member, Essential essential, String key) {
        return FCMDto.builder()
                .fcmToken(member.getFcmToken())
                .title(getTitleMessage(member.getName(), essential.getTitle()))
                .body(getBodyMessage())
                .key(key)
                .build();
    }

    public static FCMDto ofCheatRequestDto(CheatRequestDto dto, String token) {
        return FCMDto.builder()
                .fcmToken(token)
                .title(dto.getTitle())
                .body(dto.getContent())
                .key(dto.getKey())
                .build();
    }
}
