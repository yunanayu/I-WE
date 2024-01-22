package com.iandwe.member.controller;

import java.util.Map;

import com.iandwe.member.dto.MemberDto;
import com.iandwe.member.service.MemberService;
import com.iandwe.security.util.JWTUtil;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
@RequiredArgsConstructor
public class SocialController {

    private final MemberService memberService;


    @GetMapping("/api/member/kakao")
    public Map<String,Object> getMemberFromKakao(String accessToken) {

        log.info("access Token: " + accessToken);

        MemberDto memberDto = memberService.getKakaoMember(accessToken);

        Map<String, Object> claims = memberDto.getClaims();

        String jwtAccessToken = JWTUtil.generateToken(claims, 10);
        String jwtRefreshToken = JWTUtil.generateToken(claims,60*24);

        claims.put("accessToken", jwtAccessToken);
        claims.put("refreshToken", jwtRefreshToken);

        return claims;
    }

//    @PutMapping("/api/member/modify")
//    public Map<String,String> modify(@RequestBody MemberModifyDto memberModifyDTO) {
//
//        log.info("member modify: " + memberModifyDTO);
//
//        memberService.modifyMember(memberModifyDTO);
//
//        return Map.of("result","modified");
//
//    }


}

