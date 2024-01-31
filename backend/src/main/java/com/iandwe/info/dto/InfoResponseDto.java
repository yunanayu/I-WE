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

    private String title;

    private String infoDetail;

    private String target;

    private String category;

    private String targetTime;

    public static InfoResponseDto from(Info info) {
        return InfoResponseDto.builder()
                .num(info.getNum())
                .title(info.getTitle())
                .infoDetail(info.getInfoDetail())
                .target(info.getTarget())
                .category(info.getCategory())
                .targetTime(info.getTargetTime())
                .build();
    }
}
