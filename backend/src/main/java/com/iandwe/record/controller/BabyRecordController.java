package com.iandwe.record.controller;

import com.iandwe.record.dto.*;
import com.iandwe.record.service.BabyRecordService;
import jakarta.mail.Multipart;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/babyRecord")
public class BabyRecordController {

    private final BabyRecordService babyRecordService;

//    @PostMapping("/create")
//    public ResponseEntity<?> create(@RequestPart BabyRecordCreateRequestDto dto) {
//        babyRecordService.create(dto);
//        return new ResponseEntity<>(HttpStatus.CREATED);
//    }

    @PostMapping("/create")
    public ResponseEntity<BabyRecordReadResponseDto> create(@RequestPart(value = "files", required = false) List<MultipartFile> files,
                                    @RequestPart(value = "dto") BabyRecordCreateRequestDto dto) {
        BabyRecordReadResponseDto responseDto = babyRecordService.create(files, dto);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }


    @GetMapping("/{babyNum}")
    public ResponseEntity<List<BabyRecordReadResponseDto>> findAllByBabyNum(@PathVariable long babyNum) {
        return new ResponseEntity<>(babyRecordService.findAllByBabyNum(babyNum), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<BabyRecordReadResponseDto> update(@RequestPart(value = "files", required = false) List<MultipartFile> files,
                                    @RequestPart(value = "dto") BabyRecordUpdateRequestDto dto) {
        BabyRecordReadResponseDto responseDto = babyRecordService.update(dto, files);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
}
