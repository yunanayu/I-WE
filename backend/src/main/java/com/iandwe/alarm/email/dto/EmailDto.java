package com.iandwe.alarm.email.dto;

import com.iandwe.alarm.email.util.EmailGenerator;
import com.iandwe.cheat.dto.request.CheatRequestDto;
import com.iandwe.essential.domain.Essential;
import com.iandwe.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmailDto {

    private String subject;

    private String text;

    private String email;

    public static EmailDto of(Member mother, Essential essential) {
        return EmailDto.builder()
                .email(mother.getEmail())
                .subject(EmailGenerator.generateSubject(mother.getName()))
                .text(EmailGenerator.generateText(essential.getTitle(), essential.getCategory()))
                .build();
    }

    public static EmailDto ofCheatRequestDto(CheatRequestDto dto, String email) {
        return EmailDto.builder()
                .email(email)
                .subject(dto.getTitle())
                .text(dto.getContent())
                .build();
    }

}
