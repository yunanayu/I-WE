package com.iandwe.common.gpt.dto.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.iandwe.common.gpt.dto.request.ChatGptMessage;
import lombok.Getter;

@Getter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ChatGptChoice {

    private ChatGptMessage message;

    private String finishReason;

    private int index;

}
