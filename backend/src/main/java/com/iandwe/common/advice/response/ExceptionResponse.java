package com.iandwe.common.advice.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ExceptionResponse {

    private String message;

    public static ExceptionResponse from(String message){
        return ExceptionResponse.builder()
                .message(message)
                .build();
    }
}
