package com.iandwe.common.gpt.service;

import com.iandwe.common.gpt.dto.request.ChatGptRequest;
import com.iandwe.common.gpt.dto.response.ChatGptResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class GptService {

    private final WebClient gptWebClient;

    public String summary(String content){
        return summarizeByChatGpt(ChatGptRequest.of(content))
                .map(ChatGptResponse::getParagraphs)
                .block();
    }

    private Mono<ChatGptResponse> summarizeByChatGpt(ChatGptRequest chatGptRequest) {
        return gptWebClient.post()
                .uri("/v1/chat/completions")
                .bodyValue(chatGptRequest)
                .retrieve()
                .bodyToMono(ChatGptResponse.class);
    }
}
