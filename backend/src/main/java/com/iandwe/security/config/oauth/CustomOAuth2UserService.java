package com.iandwe.security.config.oauth;

import com.iandwe.member.domain.Member;
import com.iandwe.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

/**
 * OAuth 2.0 인증을 통해 사용자 정보를 가져오는 역할
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberService memberService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // 기본 OAuth2UserService 객체 생성
        OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService = new DefaultOAuth2UserService();

        // OAuth2UserService를 사용하여 OAuth2User 정보를 가져옴
        OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);

        // 클라이언트 등록 ID(google, naver, kakao)와 사용자 이름 속성(키가 되는 필드 값. 구글:sub, 카카오:email, 네이버:id)을 가져옴
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        // 가져온 OAuth2User 정보로 OAuth2Attribute 객체를 만듦
        OAuth2Attribute oAuth2Attribute =
                OAuth2Attribute.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        // OAuth2Attribute의 속성값들을 Map으로 반환
        Map<String, Object> memberAttribute = oAuth2Attribute.convertToMap();

        // 사용자 email(또는 id) 정보를 가져옴
        String email = (String) memberAttribute.get("email");
        // 이메일로 가입된 회원인지 조회
        Optional<Member> findMember = memberService.findByEmail(email);

        if (findMember.isEmpty()) {
            // 회원이 존재하지 않을경우 => SuccessHandler에서 exist 변수의 값에 따라서 회원가입을 여부를 확인하고 처리
            memberAttribute.put("exist", false);
            // 회원의 권한(DB에 권한이 없으므로, 기본권한인 ROLE_USER를 넣어줌), 회원속성, 속성이름을 이용해 DefaultOAuth2User 객체를 생성해 반환
            return new DefaultOAuth2User(
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                    memberAttribute, "email");
        }

        // 회원이 존재할경우 => SuccessHandler에서 exist 변수의 값에 따라서 회원가입을 여부를 확인하고 처리
        memberAttribute.put("exist", true);
        // 회원의 권한, 회원속성, 속성이름을 이용해 DefaultOAuth2User 객체를 생성해 반환
        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_".concat(String.valueOf(findMember.get().getRole())))),
                memberAttribute, "email");

    }
}