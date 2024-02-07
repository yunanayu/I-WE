package com.iandwe.cheat.controller;

import com.iandwe.cheat.dto.request.CheatRequestDto;
import com.iandwe.cheat.service.CheatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CheatController {

    private final CheatService cheatService;

    @PostMapping("/api/cheat")
    public ResponseEntity<?> shoot(@RequestBody CheatRequestDto cheatRequestDto) {
        cheatService.cheatEmail(cheatRequestDto);
        cheatService.cheatFCM(cheatRequestDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
