package com.iandwe.common.gpt.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient gptWebClient(@Value("${gpt-base-url}") String baseUrl, @Value("${gpt-api-key}") String key) {
        return WebClient.builder()
                .baseUrl((baseUrl))
                .defaultHeaders(httpHeaders -> {
                    httpHeaders.set("Authorization", "Bearer " + key);
                    httpHeaders.set("Content-Type", "application/json");
                })
                .build();
    }
}
