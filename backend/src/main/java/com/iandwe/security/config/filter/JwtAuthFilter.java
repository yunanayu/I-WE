package com.iandwe.security.config.filter;

import com.iandwe.member.domain.Member;
import com.iandwe.member.repository.MemberRepository;
import com.iandwe.security.dto.SecurityMemberDto;
import com.iandwe.security.dto.SecurityMemberDto;
import com.iandwe.security.service.JwtUtil;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

/**
 * JWT 토큰을 검사
 */
@RequiredArgsConstructor
@Slf4j
@Component
public class JwtAuthFilter extends OncePerRequestFilter { // OncePerRequestFilter : 어느 서블릿 컨테이너에서나 요청 당 한 번의 실행을 보장

    private final JwtUtil jwtUtil;
    private final MemberRepository memberRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        // request Header에서 AccessToken을 가져옴
        String atc = request.getHeader("Authorization");

        // Access Token의 값이 비어있을 경우, 더 이상 검증을 진행하지 않고 통과
        // 토큰 검사 생략(모두 허용 URL의 경우 토큰 검사 통과)
        if (!StringUtils.hasText(atc)) {
            doFilter(request, response, filterChain); // 바로 다음 filter로 보내줌
            return;
        }

        // AccessToken을 검증하고, 만료되었을경우 예외를 발생시킴
        if (!jwtUtil.verifyToken(atc)) {
            throw new JwtException("Access Token 만료!");
        }
        // AccessToken의 값이 있고, 유효한 경우
        else if (jwtUtil.verifyToken(atc)) {
            // AccessToken 내부의 payload에 있는 email로 user를 조회함. 없다면 예외를 발생시킴 -> 정상 케이스가 아님
            Member findMember = memberRepository.findByEmail(jwtUtil.getUid(atc))
                    .orElseThrow(IllegalStateException::new);

            // SecurityContext에 등록할 User 객체를 만들어줌
            SecurityMemberDto userDto = SecurityMemberDto.builder()
                    .num(findMember.getNum())
                    .email(findMember.getEmail())
                    .role(String.valueOf(findMember.getRole()))
                    .nickname(findMember.getName())
                    .build();

            // SecurityContext에 인증 객체를 등록해줌
            Authentication auth = getAuthentication(userDto);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        filterChain.doFilter(request, response);
    }

    // Authentication 객체로 변환
    public Authentication getAuthentication(SecurityMemberDto member) {
        return new UsernamePasswordAuthenticationToken(member, "",
                List.of(new SimpleGrantedAuthority(member.getRole())));
    }

}