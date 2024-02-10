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
    private Long num;

    private String email;

    private String memberId;

    private String name;

    private String password;

    @Enumerated(EnumType.STRING)
    private MemberRole role; // ROLE_USER, ROLE_ADMIN

    @Enumerated(EnumType.STRING)
    private PlatformType platform; // NONE, KAKAO, NAVER, GOOGLE

    @Enumerated(EnumType.STRING)
    private ParentType parentType; // MOTHER, FATHER

    private Long familyNum;

    private String profileImage;

    private String fcmToken;

    @CreationTimestamp
    private LocalDateTime joinDate;

    public void updateFcmToken(String fcmToken) {
        this.fcmToken = fcmToken;
    }

    public void updateParentType(String parentType) {this.parentType = ParentType.valueOf(parentType);}

    public void updateFamilyNum(Long num) {
        this.familyNum = num;
    }
}
