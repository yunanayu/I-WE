package com.iandwe.common.util;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Getter
@Component
public class PasswordInitializer {

    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public PasswordInitializer () {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // 비밀번호 생성 및 암호화 메서드
    public String generateAndEncodeTemporaryPassword() {
        // UUID를 기반으로 임시 비밀번호 생성
        String temporaryPassword = UUID.randomUUID().toString();

        // 생성된 임시 비밀번호를 암호화
        String encodedPassword = passwordEncoder.encode(temporaryPassword);

        return encodedPassword;
    }
}
