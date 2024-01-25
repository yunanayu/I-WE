package com.iandwe.member.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberNo;

    private String email;

    private String nickname;

    private String password;

    private String userRole; // ROLE_USER, ROLE_ADMIN

    private String platform;

    private String profile;

    @CreationTimestamp
    private LocalDateTime regDate;

//    @CreationTimestamp
//    private Timestamp createDate;

}
