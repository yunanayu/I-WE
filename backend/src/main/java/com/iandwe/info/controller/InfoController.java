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

    @GetMapping("/{target}/{category}/{targetTime}")
    public ResponseEntity<List<InfoResponseDto>> findByTargetAndTargetTimeAndCategory(@PathVariable String target, @PathVariable char category, @PathVariable String targetTime) {
        List<InfoResponseDto> infos = infoService.findByTargetAndTargetTimeAndCategory(new InfoRequestDto(target, category, targetTime));
        return new ResponseEntity<>(infos, HttpStatus.OK);
    }
}
