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
    public ResponseEntity<MotherRecordReadReponseDto> create(@RequestBody MotherRecordCreateRequestDto dto) {
        MotherRecordReadReponseDto responseDto = motherRecordService.create(dto);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @GetMapping("/{motherNum}")
    public ResponseEntity<List<MotherRecordReadReponseDto>> findAllByMotherNum(@PathVariable long motherNum) {
        return new ResponseEntity<>(motherRecordService.findAllByMotherNum(motherNum), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<MotherRecordReadReponseDto> update(@RequestBody MotherRecordUpdateRequestDto dto) {
        MotherRecordReadReponseDto responseDto = motherRecordService.update(dto);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
}
