package com.iandwe.alarm.fcm.dto;

import com.iandwe.alarm.fcm.constant.FCMMessage;
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

    public static FCMDto of(Member member, Essential essential) {
        return FCMDto.builder()
                .fcmToken(member.getFcmToken())
                .title(getTitleMessage(member.getName(), essential.getTitle()))
                .body(getBodyMessage())
                .build();
    }
}
