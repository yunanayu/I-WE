package com.iandwe.member.service;

import java.util.LinkedHashMap;
import java.util.Optional;

import com.iandwe.member.domain.Member;
import com.iandwe.member.domain.MemberStatus;
import com.iandwe.member.dto.MemberDto;
import com.iandwe.member.repository.MemberRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;


import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
@Log4j2
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public MemberDto getKakaoMember(String accessToken) {

        // accessToken을 이용해서 사용자 정보 가져오기
        // 카카오 연동 닉네임 -- 이메일 주소에 해당
        String nickname = getEmailFromKakaoAccessToken(accessToken);
        log.info("nickname: " + nickname);

        // 기존에 DB에 회원 정보가 있는 경우 / 없는 경우
        // 현재 데이터베이스와 처리
        Optional<Member> result = memberRepository.findById(nickname);  //??????????????

        // 기존의 회원
        if (result.isPresent()) {
            MemberDto memberDto = entityToDto(result.get());
            log.info("existed................." + memberDto);

            return memberDto;
        }

        // 회원이 아니었다면
        // 닉네임은 '소셜회원'으로, 패스워드는 임의로 생성
        Member socialMember = makeSocialMember(nickname);
        memberRepository.save(socialMember);

        MemberDto memberDto = entityToDto(socialMember);

        return memberDto;
    }

    private String getEmailFromKakaoAccessToken(String accessToken) {

        String kakaoGetUserURL = "https://kapi.kakao.com/v2/user/me";

//        if(accessToken == null){
//            throw new RuntimeException("Access Token is null");
//        }
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-form-urlencoded");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(kakaoGetUserURL).build();

        ResponseEntity<LinkedHashMap> response =
                restTemplate.exchange(uriBuilder.toString(), HttpMethod.GET, entity, LinkedHashMap.class);

        log.info(response);

        LinkedHashMap<String, LinkedHashMap> bodyMap = response.getBody();

        log.info("------------------------------------");
        log.info(bodyMap);

        LinkedHashMap<String, String> kakaoAccount = bodyMap.get("properties");
        log.info("kakaoAccount: " + kakaoAccount);

        String nickname = kakaoAccount.get("nickname");
        log.info("nickname: " + nickname);

        return nickname;
    }

    private Member makeSocialMember(String email) {

        String tempPassword = makeTempPassword();
        log.info("tempPassword: " + tempPassword);

        Member member = Member.builder()
                .memberId("kakao_" + email)
                .password(passwordEncoder.encode(tempPassword))
                .name("Social Member")
                .emailId(email)
                .loginType(true)
                .build();

        member.changeStatus(MemberStatus.USER);

        return member;
    }

    private String makeTempPassword() {

        StringBuffer buffer = new StringBuffer();

        for(int i = 0;  i < 10; i++){
            buffer.append(  (char) ( (int)(Math.random()*55) + 65  ));
        }
        return buffer.toString();
    }

//    @Override
//    public void modifyMember(MemberModifyDTO memberModifyDTO) {
//
//        Optional<Member> result = memberRepository.findById(memberModifyDTO.getEmail());
//
//        Member member = result.orElseThrow();
//
//        member.changePw(passwordEncoder.encode(memberModifyDTO.getPw()));
//        member.changeSocial(false);
//        member.changeNickname(memberModifyDTO.getNickname());
//
//        memberRepository.save(member);
//
//    }
}