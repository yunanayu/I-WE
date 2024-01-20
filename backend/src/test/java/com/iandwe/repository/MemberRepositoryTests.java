package com.iandwe.repository;

import com.iandwe.member.domain.Member;
import com.iandwe.member.domain.MemberStatus;
import com.iandwe.member.repository.MemberRepository;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
@Log4j2
public class MemberRepositoryTests {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void testInsertMember() {

        for (int i = 0; i < 10; i++) {

            Member member = Member.builder()
                    .memberId("user" + i)
                    .password(passwordEncoder.encode("1111"))
                    .name("USER" + i)
                    .build();

            member.changeStatus(MemberStatus.USER);

            if (i == 5 ||  i == 6) {
                member.changeStatus(MemberStatus.DORMANT);
            } else if (i == 7 || i == 8) {
                member.changeStatus(MemberStatus.WITHDRAWAL);
            } else if (i == 9) {
                member.changeStatus(MemberStatus.ADMIN);
            }

            memberRepository.save(member);
        }
    }

    @Test
    public void testRead() {

        Long num = 9L;

        Member member = memberRepository.getWithNum(num);

        log.info("-----------------");
        log.info(member);
    }

}
