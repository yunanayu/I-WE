package com.iandwe.member.controller;

import com.iandwe.common.StatusResponseDto;
import com.iandwe.member.dto.request.MemberRegisterDto;
import com.iandwe.member.dto.request.MemberUpdateFcmTokenDto;
import com.iandwe.member.dto.response.MemberInfoDto;
import com.iandwe.member.service.MemberService;
import com.iandwe.security.SecurityUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;

    @PatchMapping
    public ResponseEntity<?> updateFcmToken(@RequestBody MemberUpdateFcmTokenDto memberUpdateFcmTokenDto) {
        memberService.updateFcmToken(memberUpdateFcmTokenDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> findByAccessToken(@RequestHeader String Authorization) {
        MemberInfoDto memberInfoDto = memberService.findByAccessToken(Authorization);

        return new ResponseEntity<>(memberInfoDto, HttpStatus.OK);
    }

    // 일반 회원가입 => 필요하면 구현 예정
//    @PostMapping
//    public ResponseEntity<StatusResponseDto> register(@Valid @RequestBody MemberRegisterDto memberRegisterDto, BindingResult bindingResult) {
//        // DTO의 유효성 검사가 실패할 경우 400번 에러를 돌려준다.
//        if (bindingResult.hasErrors()) {
//            return ResponseEntity.badRequest().body(StatusResponseDto.addStatus(400));
//        }
//
//        // 회원을 저장한다.
//        memberService.save(memberRegisterDto);
//        return ResponseEntity.ok(StatusResponseDto.addStatus(200));
//    }
}
