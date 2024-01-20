package com.iandwe.member.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
//@ToString(exclude = "memberStatusList")
public class Member {

    @Id
    @GeneratedValue
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

    @Column(columnDefinition = "TINYINT(1)")
    private boolean loginType;

    @Column(columnDefinition = "TINYINT(1)")
    private boolean parentType;

    private String profileImage;
    private LocalDateTime joinDate;

    @Enumerated(EnumType.STRING)
    private MemberStatus status;

    public void changeStatus(MemberStatus status) {
        this.status = status;
    }

//    @ElementCollection(fetch = FetchType.LAZY)
//    @Builder.Default
//    private List<MemberStatus> memberStatusList = new ArrayList<>();
//
//    public void addStatus(MemberStatus memberStatus) {
//        memberStatusList.add(memberStatus);
//    }
//
//    public void clearRole() {
//        memberStatusList.clear();
//    }

}
