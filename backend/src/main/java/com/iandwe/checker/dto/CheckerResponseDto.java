package com.iandwe.checker.dto;

import com.iandwe.checker.domain.BabyChecker;
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

    private String startTime;

    private String endTime;

    private String category;

    private String target;

    private Long babyNum;

    public static CheckerResponseDto of(Essential essential, BabyChecker babyChecker) {
        return CheckerResponseDto.builder()
                .essentialNum(essential.getNum())
                .title(essential.getTitle())
                .description(essential.getDescription())
                .complete(babyChecker.isComplete())
                .startTime(essential.getStartTime())
                .endTime(essential.getEndTime())
                .category(essential.getCategory())
                .target(essential.getTarget())
                .babyNum(babyChecker.getBabyNum())
                .build();
    }
}
