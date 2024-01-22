package com.iandwe.security.filter;

import com.google.gson.Gson;
import com.iandwe.member.domain.MemberStatus;
import com.iandwe.member.dto.MemberDto;
import com.iandwe.security.util.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

// OncePerRequestFilter : 모든 경우에 동작하는 필터
@Log4j2
public class JWTCheckFilter extends OncePerRequestFilter {

    // 필터링하지 않는 경로 명시
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();

        log.info("check uri----------" + path);

//        // Preflight요청은 체크하지 않음
//        if(request.getMethod().equals("OPTIONS")){
//            return true;
//        }

        // true == not checking
        // api/member/ 경로의 호출은 체크하지 않음
        if(path.startsWith("/api/member/")) {
            return true;
        }

//        //이미지 조회 경로는 체크하지 않는다면
//        if(path.startsWith("/api/products/view/")) {
//            return true;
//        }

        // false == check
        return false;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("------------------");

        log.info("------------------");

        log.info("------------------");

        // Authorization: <type> <credentials>
        String authHeaderStr = request.getHeader("Authorization");

        try {
            // Bearer //7 JWT 문자열
            String accessToken = authHeaderStr.substring(7);
            Map<String, Object> claims = JWTUtil.validateToken(accessToken);

            log.info("JWT claims: " + claims);

            // dest (다음 filter 또는 controller)
            filterChain.doFilter(request, response);

            Long num = (Long) claims.get("num");
            String memberId = (String) claims.get("memberId");
            String name = (String) claims.get("name");
            String password = (String) claims.get("password");
            String salt = (String) claims.get("salt");
            String emailId = (String) claims.get("emailId");
            String emailDomain = (String) claims.get("emailDomain");
            LocalDate birth = (LocalDate) claims.get("birth");
            String phone = (String) claims.get("phone");
            String address = (String) claims.get("address");
            Boolean loginType = (Boolean) claims.get("loginType");
            Boolean parentType = (Boolean) claims.get("parentType");
            String profileImage = (String) claims.get("profileImage");
            LocalDateTime joinDate = (LocalDateTime) claims.get("joinDate");
            MemberStatus status = (MemberStatus) claims.get("status");

            MemberDto memberDto = new MemberDto(num, memberId, name, password, salt, emailId, emailDomain, birth,
                    phone, address, loginType, parentType, profileImage, joinDate, status);

            log.info("-----------------------------------");
            log.info(memberDto);
            log.info(memberDto.getAuthorities());

            // UsernamePasswordAuthenticationToken : SecurityContext가 사용하는 토큰
            UsernamePasswordAuthenticationToken authenticationToken
                    = new UsernamePasswordAuthenticationToken(memberDto, password, memberDto.getAuthorities());

            // SecurityContextHolder에 현재 사용자가 어떤 사용자인지에 대한 정보 만들어서 줘야
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            filterChain.doFilter(request, response);

        }catch(Exception e){

            log.error("JWT Check Error..............");
            log.error(e.getMessage());

            Gson gson = new Gson();
            String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));

            response.setContentType("application/json");
            PrintWriter printWriter = response.getWriter();
            printWriter.println(msg);
            printWriter.close();

        }
    }
}
