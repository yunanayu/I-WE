package com.iandwe.common.gpt.dto.request;

import lombok.Builder;
import lombok.Getter;

import java.util.Arrays;
import java.util.List;

@Getter
@Builder
public class ChatGptRequest {

    private String model;

    private List<ChatGptMessage> messages;

    private double temperature;

    public static ChatGptRequest of(String content) {
        return ChatGptRequest.builder()
                .model("gpt-3.5-turbo")
                .messages(List.of(new ChatGptMessage("user", content + "\n 한줄요약")))
                .temperature(0.7)
                .build();
    }
}
