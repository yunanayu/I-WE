package com.iandwe.baby.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BabyUpdateRequestDto {

    private Long babyNum;

    private String name;

    private Integer gender;

    private LocalDate pregnancyDate;

    private boolean status;

    private LocalDate birth;

}
