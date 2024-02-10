package com.iandwe.record.controller;

import com.iandwe.record.dto.GrowthResponseDto;
import com.iandwe.record.service.GrowthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor

@RequestMapping("/api/growth")
public class GrowthController {

    private final GrowthService growthService;

    @GetMapping("/{gender}/{month}/{height}/{weight}/{circumferences}")
    public ResponseEntity<GrowthResponseDto> findPercentiles(@PathVariable int gender, @PathVariable int month, @PathVariable float height, @PathVariable float weight, @PathVariable float circumferences) {
        return new ResponseEntity<>(growthService.findPercentiles(gender, month, height, weight, circumferences), HttpStatus.OK);
    }
}
