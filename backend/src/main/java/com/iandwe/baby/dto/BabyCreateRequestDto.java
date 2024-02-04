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
public class
BabyCreateRequestDto {

    private Long motherNum;

    private String name;

    private LocalDate pregnancyDate;

    private LocalDate birth;

    private boolean status;

    private int gender;

    public Baby toEntity() {
        return Baby.builder()
                .motherNum(motherNum)
                .name(name)
                .pregnancyDate(pregnancyDate)
                .birth(birth)
                .gender(gender)
                .status(!(birth == null || String.valueOf(birth).isEmpty()))
                .build();
    }
}
