package com.iandwe.checker.dto;

import com.iandwe.essential.domain.Essential;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class CheckerResponseDto {

    private Long essentialNum;

    private String title;

    private String description;

    private boolean complete;

    private int targetTime;

    private String category;

    public static CheckerResponseDto of(Essential essential, boolean isComplete){
        return CheckerResponseDto.builder()
                .essentialNum(essential.getNum())
                .title(essential.getTitle())
                .description(essential.getDescription())
                .complete(isComplete)
                .targetTime(essential.getTargetTime())
                .category(essential.getCategory())
                .build();
    }
}
