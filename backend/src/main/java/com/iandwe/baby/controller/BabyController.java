package com.iandwe.baby.controller;

import com.iandwe.baby.dto.*;
import com.iandwe.baby.service.BabyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/baby")
public class BabyController {

    private final BabyService babyService;

    @PostMapping()
    public ResponseEntity<BabyCreateResponseDto> create(@RequestBody BabyCreateRequestDto requestDto) { // 엄마 id 매개변수로 저장
        BabyCreateResponseDto responseDto = babyService.create(requestDto);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @GetMapping("/{userNum}")
    public ResponseEntity<List<BabyReadResponseDto>> findAllByUserNum(@PathVariable long userNum) {
        return new ResponseEntity<>(babyService.findAllByUserNum(userNum), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<BabyReadResponseDto> update(@RequestBody BabyUpdateRequestDto requestDto) {
        return new ResponseEntity<>(babyService.update(requestDto), HttpStatus.OK);
    }

}
