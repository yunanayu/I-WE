package com.iandwe.security;


import com.iandwe.member.domain.Member;
import com.iandwe.member.dto.MemberDto;
import com.iandwe.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Log4j2
public class CustomUserDetailService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        log.info("----------------loadUserByUsername-----------------" + username);

        Member member = memberRepository.getWithNum(Long.valueOf(username));

        if(member == null) {
            throw new UsernameNotFoundException("Not Found");
        }

        MemberDto memberDto = new MemberDto(
                member.getNum(),
                member.getMemberId(),
                member.getName(),
                member.getPassword(),
                member.getSalt(),
                member.getEmailId(),
                member.getEmailDomain(),
                member.getBirth(),
                member.getPhone(),
                member.getAddress(),
                member.isLoginType(),
                member.isParentType(),
                member.getProfileImage(),
                member.getJoinDate(),
                member.getStatus()
        );

        log.info(memberDto);

        return memberDto;
    }
}
