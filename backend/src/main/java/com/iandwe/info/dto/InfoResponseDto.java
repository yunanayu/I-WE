package com.iandwe.info.dto;

import com.iandwe.info.domain.Info;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InfoResponseDto {

    private Long num;

    private String target;

    private String content;

    private char category;

    private String startTime;

    private String endTime;

    public static InfoResponseDto from(Info info) {
        if(info.getContent().startsWith("\"")){
            info.setContent(info.getContent().substring(1,info.getContent().length()-1));
        }
        return InfoResponseDto.builder()
                .num(info.getNum())
                .target(info.getTarget())
                .content(info.getContent())
                .category(info.getCategory())
                .startTime(info.getStartTime())
                .endTime(info.getEndTime())
                .build();
    }
}
