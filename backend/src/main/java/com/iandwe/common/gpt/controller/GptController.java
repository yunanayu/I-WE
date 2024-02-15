package com.iandwe.common.gpt.controller;

import com.iandwe.common.gpt.service.GptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class GptController {

    private final GptService gptService;

    @PostMapping("/api/gpt")
    public ResponseEntity<String> summary(@RequestBody String content){
        return new ResponseEntity<>(gptService.summary(content), HttpStatus.CREATED);
    }
}
