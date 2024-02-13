package com.iandwe.checker.dto;

import lombok.Getter;

@Getter
public class CheckerUpdateRequestDto {

    private long targetNum;

    private long essentialNum;

    private String target;

    private Boolean isComplete;

    private Long babyNum;
}
