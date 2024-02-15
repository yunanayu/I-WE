package com.iandwe.security.config;

import com.iandwe.security.config.filter.JwtAuthFilter;
import com.iandwe.security.config.handler.MyAuthenticationFailureHandler;
import com.iandwe.security.config.handler.MyAuthenticationSuccessHandler;
import com.iandwe.security.config.oauth.CustomOAuth2UserService;
import com.iandwe.security.config.filter.JwtExceptionFilter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

/**
 * Spring Security 기능을 활성화시키고, OAuth 2.0과 JWT 로그인을 활용하기 위한 설정 클래스
 */
@Slf4j
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final CustomOAuth2UserService customOAuth2UserService;
    private final JwtAuthFilter jwtAuthFilter;
    private final MyAuthenticationSuccessHandler oAuth2LoginSuccessHandler;
    private final MyAuthenticationFailureHandler oAuth2LoginFailureHandler;
    private final JwtExceptionFilter jwtExceptionFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .httpBasic(config -> config.disable()) // HTTP 기본 인증을 비활성화
//                .cors(Customizer.withDefaults()) // CORS 활성화
//                .cors(config -> config.configurationSource(corsConfigurationSource())) // CORS 활성화
                .cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer.disable())
                .csrf(config -> config.disable()) // CSRF 보호 기능 비활성화
                .sessionManagement(config -> config.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션관리 정책을 STATELESS(세션이 있으면 쓰지도 않고, 없으면 만들지도 않음)
                // 요청에 대한 인증 설정
                .authorizeHttpRequests(config -> config
                                .requestMatchers("/**").permitAll()
//                        .requestMatchers("/token/**").permitAll() // 접근 권한 검사 x(인증 필요 없다는 뜻은 x). 토큰 발급을 위한 경로는 모두 허용
//                        .requestMatchers("/mypage/**").hasAnyRole("USER", "ADMIN") // 마이페이지는 회원, 관리자 권한디 있어야 접근 가능
//                        .requestMatchers("/", "/css/**", "/images/**", "/js/**", "/favicon.ico", "/h2-console/**").permitAll()
//                                .anyRequest().authenticated() // 그 외의 모든 요청은 인증이 필요
                        .anyRequest().permitAll()

                )
                // OAuth2 로그인 설정
                .oauth2Login(config -> config
                        .userInfoEndpoint(config2 -> config2.userService(customOAuth2UserService)) // OAuth2 로그인시 사용자 정보를 가져오는 엔드포인트와 사용자 서비스를 설정
                        .failureHandler(oAuth2LoginFailureHandler) // OAuth2 로그인 실패시 처리할 핸들러를 지정
                        .successHandler(oAuth2LoginSuccessHandler) // OAuth2 로그인 성공시 처리할 핸들러를 지정
                )
                // JWT 인증 필터를 UsernamePasswordAuthenticationFilter 앞에 추가
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtExceptionFilter, JwtAuthFilter.class);
        return http.build();
    } 



    

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration  = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true);
        configuration.addAllowedOrigin("http://localhost:3000");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}