package com.iandwe.common.gpt.dto.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;

@Getter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ChatGptUsage {

    private int promptTokens;

    private int completionTokens;

    private int totalTokens;

}
