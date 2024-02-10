package com.iandwe.record.controller;

import com.iandwe.record.dto.GrowthResponseDto;
import com.iandwe.record.repository.GrowthHeightRepository;
import com.iandwe.record.repository.GrowthWeightRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/growth")
public class GrowthController {

    private final GrowthHeightRepository growthHeightRepository;
    private final GrowthWeightRepository growthWeightRepository;

    @GetMapping("/{gender}/{month}/{height}/{weight}")
    public ResponseEntity<GrowthResponseDto> find(@PathVariable int gender, @PathVariable int month, @PathVariable float height, @PathVariable float weight) {
        GrowthResponseDto dto = new GrowthResponseDto();
        growthHeightRepository.findByGenderAndMonth(gender, month);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
