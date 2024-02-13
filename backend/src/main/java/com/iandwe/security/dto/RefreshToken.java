//package com.iandwe.security.dto;
//
//import jakarta.persistence.Id;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import org.springframework.data.redis.core.RedisHash;
//import org.springframework.data.redis.core.index.Indexed;
//
//import java.io.Serializable;
//
//@Getter
//@AllArgsConstructor
//@RedisHash(value = "jwtToken", timeToLive = 60*60*24*14) // 2주
//public class RefreshToken implements Serializable {
//
//    @Id
//    private String id;
//
//    @Indexed // Secondary Index로 쿼리 성능 높여줌
//    private String accessToken;
//
//    private String refreshToken;
//
//    public void updateAccessToken(String accessToken) {
//        this.accessToken = accessToken;
//    }
//
//}
