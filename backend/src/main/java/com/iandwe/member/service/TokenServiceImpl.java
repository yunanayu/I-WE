//package com.iandwe.member.service;
//
//import com.iandwe.member.repository.TokenRepository;
//import com.iandwe.security.dto.RefreshToken;
//import com.iandwe.security.dto.SecurityMemberDto;
//import com.iandwe.security.service.JwtUtil;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//@RequiredArgsConstructor
//public class TokenServiceImpl implements TokenService {
//
//    private final TokenRepository tokenRepository;
//    private final JwtUtil jwtUtil;
//
//    @Override
//    public void removeRefreshToken(String accessToken, SecurityMemberDto userDto) {
//        RefreshToken token = tokenRepository.findByAccessToken(accessToken)
//                .orElseThrow(IllegalArgumentException::new);
//
//        tokenRepository.delete(token);
//    }
//
//    @Override
//    public String updateAccessToken(String accessToken) {
//        // access token으로 refresh token 객체를 조회
//        Optional<RefreshToken> refreshToken = tokenRepository.findByAccessToken(accessToken);
//
//        // refresh token이 존재하고, 유효하다면 실행
//        if(refreshToken.isPresent() && jwtUtil.verifyToken(refreshToken.get().getRefreshToken())) {
//            RefreshToken resultToken = refreshToken.get();
//
//            // 아이디와 권한을 추출해서 새로운 access token을 만듦
//            String newAccessToken = jwtUtil.generateAccessToken(resultToken.getId(), jwtUtil.getRole(resultToken.getRefreshToken()));
//            // access token 값을 수정해줌
//            resultToken.updateAccessToken(newAccessToken);
//            tokenRepository.save(resultToken);
//
//            // 새로운 access token을 반환
//            return newAccessToken;
//        }
//
//        return null;
//    }
//}
