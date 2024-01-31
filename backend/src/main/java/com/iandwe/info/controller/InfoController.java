package com.iandwe.info.controller;

import com.iandwe.info.dto.InfoRequestDto;
import com.iandwe.info.dto.InfoResponseDto;
import com.iandwe.info.service.InfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/info")
public class InfoController {

    @Autowired
    private final InfoService infoService;

    @GetMapping("/info/{target}/{targetTime}/{category}")
    public ResponseEntity<List<InfoResponseDto>> findByTargetAndTargetTimeAndCategory(@PathVariable String target, @PathVariable String targetTime, @PathVariable String category) {
        List<InfoResponseDto> infos = infoService.findByTargetAndTargetTimeAndCategory(new InfoRequestDto(target, targetTime, category));
        return new ResponseEntity<>(infos, HttpStatus.OK);
    }

    @GetMapping("/detail/{num}")
    public ResponseEntity<String> findByNum(@PathVariable Long num) {
        String detail = infoService.findByNum(num);
        return new ResponseEntity<>(detail, HttpStatus.OK);
    }
}