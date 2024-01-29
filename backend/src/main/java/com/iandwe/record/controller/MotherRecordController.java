package com.iandwe.record.controller;

import com.iandwe.record.dto.MotherRecordCreateRequestDto;
import com.iandwe.record.dto.MotherRecordReadReponseDto;
import com.iandwe.record.dto.MotherRecordUpdateRequestDto;
import com.iandwe.record.service.MotherRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/motherRecord")
public class MotherRecordController {

    private final MotherRecordService motherRecordService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody MotherRecordCreateRequestDto dto) {
        motherRecordService.create(dto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{num}")
    public ResponseEntity<List<MotherRecordReadReponseDto>> findAllByNum(@PathVariable long num) {
        return new ResponseEntity<>(motherRecordService.findAllByNum(num), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody MotherRecordUpdateRequestDto dto) {
        motherRecordService.update(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
