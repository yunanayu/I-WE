package com.iandwe.security.config.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.iandwe.member.domain.Member;
import com.iandwe.member.domain.MemberRole;
import com.iandwe.member.domain.PlatformType;
import com.iandwe.member.repository.MemberRepository;
import com.iandwe.security.dto.GeneratedToken;
import com.iandwe.security.service.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class MyAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;

    private final MemberRepository memberRepository;

//    private PasswordEncoder passwordEncoder;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        // OAuth2User로 캐스팅하여 인증된 사용자 정보를 가져옴
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        // 사용자 이메일을 가져옴
        String email = oAuth2User.getAttribute("email");
        // 서비스 제공 플랫폼(GOOGLE, KAKAO, NAVER)이 어디인지 가져옴
        String provider = oAuth2User.getAttribute("provider");

        // CustomOAuth2UserService에서 셋팅한 로그인한 회원 존재 여부를 가져옴
        boolean isExist = oAuth2User.getAttribute("exist");
        // OAuth2User로부터 Role을 얻어옴
        String role = oAuth2User.getAuthorities().stream().findFirst() // 첫번째 Role을 찾아옴
                .orElseThrow(IllegalAccessError::new) // 존재하지 않을 시 예외를 던짐
                .getAuthority(); // Role을 가져옴


        // 회원이 존재할경우
        if (isExist) {
            // jwt token 발행 시작
            GeneratedToken token = jwtUtil.generateToken(email, role);
            log.info("jwtToken = {}", token.getAccessToken());

            Map<String, Object> claims = new HashMap<>();
            claims.put("accessToken", token.getAccessToken());

            Gson gson = new Gson();

            String jsonStr = gson.toJson(claims);

            response.setContentType("application/json; charset=UTF-8");
            response.getWriter().write(jsonStr);

//            PrintWriter printWriter = response.getWriter();
//            printWriter.println(jsonStr);
//            printWriter.close();

//            // accessToken을 쿼리스트링에 담는 url을 만들어준다.
//            String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:3000/loginSuccess")
//                    .queryParam("accessToken", token.getAccessToken())
//                    .build()
//                    .encode(StandardCharsets.UTF_8)
//                    .toUriString();
//
//
//            log.info("login completed redirect go~~~");
//            // 로그인 확인 페이지로 리다이렉트 시킨다.
//            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        }
        // 회원이 존재하지 않을경우
        else {
            Member member = Member.builder()
                    .email(email)
//                    .password(passwordEncoder.encode("1111"))
                    .password("1111")
                    .platform(PlatformType.valueOf(provider.toUpperCase(Locale.ROOT)))
                    .role(MemberRole.valueOf(role.substring(5)))
                    .build();
            log.info("temp register");
            memberRepository.save(member);

            // jwt token 발행 시작
            log.info("Role : " + role);
            GeneratedToken token = jwtUtil.generateToken(email, role);
            log.info("jwtToken = {}", token.getAccessToken());
            String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:3000/loginSuccess")
                    .queryParam("accessToken", token.getAccessToken())
                    .build()
                    .encode(StandardCharsets.UTF_8)
                    .toUriString();
            log.info("move login check page");
            // 로그인 확인 페이지로 리다이렉트 시킨다.
            getRedirectStrategy().sendRedirect(request, response, targetUrl);




//            // 서비스 제공자와 email을 쿼리스트링으로 전달하는 url을 만들어줌
//            String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:3000/loginSuccess")
//                    .queryParam("email", (String) oAuth2User.getAttribute("email"))
//                    .queryParam("provider", provider)
//                    .build()
//                    .encode(StandardCharsets.UTF_8)
//                    .toUriString();
//            log.info("회원가입 redirect 준비");
//            // 회원가입 페이지로 리다이렉트 시킴
//            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        }
    }

}