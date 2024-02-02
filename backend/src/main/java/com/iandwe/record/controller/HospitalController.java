package com.iandwe.record.controller;

import com.iandwe.record.dto.HospitalCreateRequestDto;
import com.iandwe.record.dto.HospitalReadResponseDto;
import com.iandwe.record.dto.HospitalUpdateRequestDto;
import com.iandwe.record.service.HospitalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/hospital")
public class HospitalController {

    private final HospitalService hospitalService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody HospitalCreateRequestDto dto) {
        hospitalService.create(dto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{target}/{targetNum}")
    public ResponseEntity<List<HospitalReadResponseDto>> findAllByTargetAndTargetNum(@PathVariable String target, @PathVariable long targetNum) {
        return new ResponseEntity<>(hospitalService.findAllByTargetAndTargetNum(target, targetNum), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody HospitalUpdateRequestDto dto) {
        hospitalService.update(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
