package com.iandwe.member.controller;

import com.iandwe.common.StatusResponseDto;
import com.iandwe.member.dto.request.MemberRegisterDto;
import com.iandwe.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/member")
    public ResponseEntity<StatusResponseDto> register(@Valid @RequestBody MemberRegisterDto memberRegisterDto, BindingResult bindingResult) {
        // DTO의 유효성 검사가 실패할 경우 400번 에러를 돌려준다.
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(StatusResponseDto.addStatus(400));
        }

        // 회원을 저장한다.
        memberService.save(memberRegisterDto);
        return ResponseEntity.ok(StatusResponseDto.addStatus(200));
    }
}
