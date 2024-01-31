package com.iandwe.essential.dto;

import com.iandwe.essential.domain.Essential;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class EssentialResponseDto {

    private Long num;

    private String title;

    private String description;

    private int targetTime;

    private String target;

    private String category;

    public static EssentialResponseDto from(Essential essential){
        return EssentialResponseDto.builder()
                .num(essential.getNum())
                .title(essential.getTitle())
                .description(essential.getDescription())
                .targetTime(essential.getTargetTime())
                .target(essential.getTarget())
                .category(essential.getCategory())
                .build();
    }
}
