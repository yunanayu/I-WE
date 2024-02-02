package com.iandwe.security;

import com.iandwe.security.dto.SecurityMemberDto;
import org.springframework.security.core.context.SecurityContextHolder;

/*
 *  Security Context의 인증 객체로부터 다양한 정보를 뽑아서 제공하는 클래스
 * */
public abstract class SecurityUtils {

    public static String getUserEmail() {
        return ((SecurityMemberDto)(SecurityContextHolder.getContext().getAuthentication().getPrincipal())).getEmail();
    }

    public static Long getUserNum() {
        return ((SecurityMemberDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getNum();
    }

    public static SecurityMemberDto getUser() {
        return (SecurityMemberDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

}