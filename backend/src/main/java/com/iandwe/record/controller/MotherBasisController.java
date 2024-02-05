package com.iandwe.record.controller;

import com.iandwe.record.dto.*;
import com.iandwe.record.service.MotherBasisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/motherBasis")
public class MotherBasisController {

    private final MotherBasisService motherBasisService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody MotherBasisCreateRequestDto dto) {
        motherBasisService.create(dto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{motherNum}")
    public ResponseEntity<MotherBasisReadResponseDto> findByMotherNum(@PathVariable long motherNum) {
        return new ResponseEntity<>(motherBasisService.findByMotherNum(motherNum), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody MotherBasisUpdateRequestDto dto) {
        motherBasisService.update(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
