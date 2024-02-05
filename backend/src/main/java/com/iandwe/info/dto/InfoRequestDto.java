package com.iandwe.info.dto;

import com.iandwe.info.domain.Info;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InfoRequestDto {

    private String target;

    private String category;

    private String targetTime;
}
