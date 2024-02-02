package com.iandwe.essential.controller;

import com.iandwe.essential.dto.EssentialResponseDto;
import com.iandwe.essential.service.EssentialService;
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
@RequestMapping("/api/essential")
public class EssentialController {

    private final EssentialService essentialService;

    @GetMapping("/{target}")
    public ResponseEntity<List<EssentialResponseDto>> findByTarget(@PathVariable String target){
        return new ResponseEntity<>(essentialService.findByTarget(target), HttpStatus.OK);
    }

    @GetMapping("/time/{targetTime}")
    public ResponseEntity<List<EssentialResponseDto>> findByTargetTime(@PathVariable String targetTime) {
        return new ResponseEntity<>(essentialService.findByTargetTime(targetTime), HttpStatus.OK);
    }

}
