package com.iandwe.baby.dto;

import com.iandwe.baby.domain.Baby;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BabyReadResponseDto {

    private Long num;

    private Long motherNum;

    private Long fatherNum;

    private String name;

    private String gender;

    private LocalDate pregnancyDate;

    private boolean status;

    private LocalDate birth;

    public static BabyReadResponseDto from(Baby baby) {
        return BabyReadResponseDto.builder()
                .num(baby.getNum())
                .motherNum(baby.getMotherNum())
                .fatherNum(baby.getFatherNum())
                .name(baby.getName())
                .gender(baby.getGender())
                .pregnancyDate(baby.getPregnancyDate())
                .status(baby.isStatus())
                .birth(baby.getBirth())
                .build();
    }

}