package com.iandwe.member.dto;

import com.iandwe.member.domain.MemberStatus;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class MemberDto extends User {

    private Long num;
    private String memberId;
    private String name;
    private String password;
    private String salt;
    private String emailId;
    private String emailDomain;
    private LocalDate birth;
    private String phone;
    private String address;
    private boolean loginType;
    private boolean parentType;
    private String profileImage;
    private LocalDateTime joinDate;
    private MemberStatus status;

    public MemberDto(Long num, String memberId, String name, String password, String salt, String emailId, String emailDomain, LocalDate birth,
                     String phone, String address, boolean loginType, boolean parentType, String profileImage, LocalDateTime joinDate, MemberStatus status) {

        super(memberId, password, Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + status)));

        this.num = num;
        this.memberId = memberId;
        this.name = name;
        this.password = password;
        this.salt = salt;
        this.emailId = emailId;
        this.emailDomain = emailDomain;
        this.birth = birth;
        this.phone = phone;
        this.address = address;
        this.loginType = loginType;
        this.parentType = parentType;
        this.profileImage = profileImage;
        this.joinDate = joinDate;
        this.status = status;
    }

    //    jwt 문자열의 내용
    public Map<String, Object> getClaims() {

        Map<String, Object> dataMap = new HashMap<>();

        dataMap.put("num", num);
        dataMap.put("memberId", memberId);
        dataMap.put("name", name);
        dataMap.put("password", password);
        dataMap.put("salt", salt);
        dataMap.put("emailId", emailId);
        dataMap.put("emailDomain", emailDomain);
        dataMap.put("birth", birth);
        dataMap.put("phone", phone);
        dataMap.put("address", address);
        dataMap.put("loginType", loginType);
        dataMap.put("parentType", parentType);
        dataMap.put("profileImage", profileImage);
        dataMap.put("joinDate", joinDate);
        dataMap.put("status", status);

        return dataMap;
    }


}
