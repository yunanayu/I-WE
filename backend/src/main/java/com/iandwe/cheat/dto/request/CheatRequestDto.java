package com.iandwe.cheat.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CheatRequestDto {

    private long num;

    private String title;

    private String content;

    private String key;
}
