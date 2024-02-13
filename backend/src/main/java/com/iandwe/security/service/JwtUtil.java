package com.iandwe.security.service;

//import com.iandwe.member.repository.TokenRepository;
//import com.iandwe.member.service.TokenService;
import com.iandwe.security.dto.GeneratedToken;
//import com.iandwe.security.dto.RefreshToken;
import com.iandwe.security.properties.JwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Date;

/**
 * Access Token과 Refresh Token을 발급하고, 검증하는 클래스
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class JwtUtil {

    private final JwtProperties jwtProperties;
//    private final TokenRepository tokenRepository;
    private static String secretKey;



    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(jwtProperties.getSecret().getBytes());
    }

    // 최초 로그인시 AccessToken과 RefreshToken을 발급
    public GeneratedToken generateToken(String email, String role) {
        // refreshToken과 accessToken을 생성
        String refreshToken = generateRefreshToken(email, role);
        String accessToken = generateAccessToken(email, role);

        // 토큰을 Redis에 저장
//        tokenRepository.save(new RefreshToken(email, accessToken, refreshToken));

        return new GeneratedToken(accessToken, refreshToken);
    }

    public String generateRefreshToken(String email, String role) {
        // 토큰의 유효 기간을 밀리초 단위로 설정
        long refreshPeriod = 1000L * 60L * 60L * 24L * 14; // 2주

        // 새로운 클레임 객체를 생성하고, 이메일과 역할(권한)을 셋팅
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("role", role);

        // 현재 시간과 날짜를 가져옴
        Date now = new Date();

        return Jwts.builder()
                // Payload를 구성하는 속성들을 정의
                .setClaims(claims)
                // 발행일자
                .setIssuedAt(now)
                // 토큰의 만료일시를 설정
                .setExpiration(new Date(now.getTime() + refreshPeriod))
                // 지정된 서명 알고리즘과 비밀 키를 사용하여 토큰을 서명
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String generateAccessToken(String email, String role) {
        long tokenPeriod = 1000L * 60L * 30L; // 30분

        Claims claims = Jwts.claims().setSubject(email);
        claims.put("role", role);

        Date now = new Date();

        return
                Jwts.builder()
                        // Payload를 구성하는 속성들을 정의
                        .setClaims(claims)
                        // 발행일자
                        .setIssuedAt(now)
                        // 토큰의 만료일시를 설정
                        .setExpiration(new Date(now.getTime() + tokenPeriod))
                        // 지정된 서명 알고리즘과 비밀 키를 사용하여 토큰을 서명
                        .signWith(SignatureAlgorithm.HS256, secretKey)
                        .compact();

    }

    // AccessToken이나 RefreshToken이 현재 유효한지 확인
    public boolean verifyToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(secretKey) // 비밀키를 설정하여 파싱함
                    .parseClaimsJws(token);  // 주어진 토큰을 파싱하여 Claims 객체를 얻음
            // 토큰의 만료 시간과 현재 시간비교
            return claims.getBody()
                    .getExpiration()
                    .after(new Date());  // 만료 시간이 현재 시간 이후인지 확인하여 유효성 검사 결과를 반환
        } catch (Exception e) {
            return false; // => 토큰이 유효하지 않다는 예외는 JWT 토큰을 검증하는 JwtAuthFilter에서 발생
        }
    }

    // 토큰에서 Email을 추출
    public static String getUid(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    // 토큰에서 ROLE(권한)만 추출
    public String getRole(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().get("role", String.class);
    }

}
