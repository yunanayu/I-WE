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

    @PutMapping("/parent")
    public ResponseEntity<?> updateParentType(String num, String parentType) {
        memberService.updateParentType(Long.valueOf(num), parentType);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
