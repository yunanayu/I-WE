package com.iandwe.checker.controller;

import com.iandwe.checker.dto.CheckerMotherResponseDto;
import com.iandwe.checker.dto.CheckerResponseDto;
import com.iandwe.checker.dto.CheckerUpdateRequestDto;
import com.iandwe.checker.service.CheckerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/check")
public class CheckerContoller {

    private final CheckerService checkerService;

    @GetMapping("/baby/{num}")
    public ResponseEntity<List<CheckerResponseDto>> findByBabyNum(@PathVariable long num) {
        return new ResponseEntity<>(checkerService.findByBabyNum(num), HttpStatus.OK);
    }

    @GetMapping("/mother/{num}")
    public ResponseEntity<List<CheckerMotherResponseDto>> findByMotherNum(@PathVariable long num) {
        return new ResponseEntity<>(checkerService.findByMotherNum(num), HttpStatus.OK);
    }

    @PutMapping("/complete")
    public ResponseEntity<?> updateComplete(@RequestBody CheckerUpdateRequestDto requestDto) {
        checkerService.updateComplete(requestDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
