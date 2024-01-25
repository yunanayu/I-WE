package com.iandwe.member.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

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

    private String username;

    private String password;

    private String email;

    private String role; //ROLE_USER, ROLE_ADMIN

    @CreationTimestamp
    private Timestamp createDate;
//    private String provider; // google
//    private String providerId; // sub=111114578118192654593



}
