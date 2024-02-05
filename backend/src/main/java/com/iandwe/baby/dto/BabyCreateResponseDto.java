package com.iandwe.baby.dto;

import com.iandwe.baby.domain.Baby;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class BabyCreateResponseDto {

    private Long motherNum;

    private String name;

    private LocalDate pregnancyDate;

    private LocalDate birth;

    private int gender;

    public static BabyCreateResponseDto from(Baby baby) {
        return BabyCreateResponseDto.builder()
                .motherNum(baby.getMotherNum())
                .name(baby.getName())
                .pregnancyDate(baby.getPregnancyDate())
                .birth(baby.getBirth())
                .gender(baby.getGender())
                .build();
    }

}
