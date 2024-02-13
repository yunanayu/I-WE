package com.iandwe.baby.controller;

import com.google.api.Http;
import com.iandwe.baby.dto.*;
import com.iandwe.baby.service.BabyService;
import com.iandwe.common.advice.response.ExceptionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/baby")
@Tag(name = "Baby", description = "아이 관련 API")
public class BabyController {

    private final BabyService babyService;

    @PostMapping()
    @Operation(summary = "아이 생성", description = "아이를 추가합니다.<br> 아이를 추가할 때, 산모와 아이의 checker data가 추가됩니다.<br> 회원의 FamilyNum 이 있다면 아이의 father 필드에 아빠 번호를 할당해줍니다. 없다면 family를 생성합니다.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "아이 생성 성공", content = @Content(schema = @Schema(implementation = BabyReadResponseDto.class))),
                    @ApiResponse(responseCode = "404", description = "아이 생성 실패", content = @Content(schema = @Schema(implementation = ExceptionResponse.class)))
            })
    public ResponseEntity<List<BabyReadResponseDto>> create(@RequestBody BabyCreateRequestDto requestDto) { // 엄마 id 매개변수로 저장
//        BabyCreateResponseDto responseDto = babyService.create(requestDto);
//        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
        List<BabyReadResponseDto> responseDtos = babyService.create(requestDto);
        return new ResponseEntity<>(responseDtos, HttpStatus.CREATED);
    }

    @GetMapping("/{userNum}")
    public ResponseEntity<List<BabyReadResponseDto>> findAllByUserNum(@PathVariable long userNum) {
        return new ResponseEntity<>(babyService.findAllByUserNum(userNum), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<BabyReadResponseDto> update(@RequestBody BabyUpdateRequestDto requestDto) {
        return new ResponseEntity<>(babyService.update(requestDto), HttpStatus.OK);
    }

    @DeleteMapping("/kill/{babyNum}")
    public ResponseEntity<?> kill(@PathVariable long babyNum) {
        babyService.kill(babyNum);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
