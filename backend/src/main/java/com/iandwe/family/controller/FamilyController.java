package com.iandwe.family.controller;

import com.iandwe.family.dto.FamilyCodeResponseDto;
import com.iandwe.family.dto.FamilyShareRequestDto;
import com.iandwe.family.service.FamilyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class FamilyController {

    private final FamilyService familyService;

    @PutMapping("/api/family/share")
    public ResponseEntity<?> share(@RequestBody FamilyShareRequestDto familyShareRequestDto){
        familyService.share(familyShareRequestDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/api/family/{motherNum}")
    public ResponseEntity<FamilyCodeResponseDto> findCodeByMotherNum(@PathVariable long motherNum){
        FamilyCodeResponseDto responseDto = familyService.findCodeByMotherNum(motherNum);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
}
