//package com.iandwe.member.controller;
//
////import com.adoptpet.server.commons.notification.repository.EmitterRepository;
////import com.adoptpet.server.commons.security.dto.RefreshToken;
////import com.adoptpet.server.commons.security.service.JwtUtil;
////import com.adoptpet.server.commons.support.StatusResponseDto;
////import com.adoptpet.server.commons.util.SecurityUtils;
////import com.adoptpet.server.user.dto.response.TokenResponseStatus;
////import com.adoptpet.server.user.repository.RefreshTokenRepository;
////import com.adoptpet.server.user.service.RefreshTokenService;
//import com.iandwe.member.service.TokenService;
//import com.iandwe.security.SecurityUtils;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.util.StringUtils;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestHeader;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@Slf4j
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/token")
//public class TokenController {
//
//    private final TokenService tokenService;
//
//    // 로그아웃 시 refresh token 삭제
//    @PostMapping("/logout")
//    public ResponseEntity<?> logout(@RequestHeader(value = "Authorization") final String accessToken) {
//        // 엑세스 토큰으로 현재 Redis 정보 삭제
//        tokenService.removeRefreshToken(accessToken, SecurityUtils.getUser());
//
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//
//    // 토큰 재발급
////    @PostMapping("/refresh")
////    public ResponseEntity<?> refresh(@RequestHeader("Authorization") final String accessToken) {
////
////        String newAccessToken = tokenService.updateAccessToken(accessToken);
////        if (StringUtils.hasText(newAccessToken)) {
////            return new ResponseEntity<>(newAccessToken, HttpStatus.OK);
////        }
////
////        return new ResponseEntity<>(null, HttpStatus.valueOf(400));
////    }
//
//}