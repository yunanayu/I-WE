package com.iandwe.record.controller;

import com.iandwe.record.dto.*;
import com.iandwe.record.service.BabyRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/babyRecord")
public class BabyRecordController {

    private final BabyRecordService babyRecordService;
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody BabyRecordCreateRequestDto dto) {
        babyRecordService.create(dto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{num}")
    public ResponseEntity<List<BabyRecordReadResponseDto>> findAllByBabyNum(@PathVariable long num) {
        return new ResponseEntity<>(babyRecordService.findAllByBabyNum(num), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody BabyRecordUpdateRequestDto dto) {
        babyRecordService.update(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
