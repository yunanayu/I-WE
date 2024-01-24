package com.iandwe.member.service;

import com.iandwe.member.domain.Member;

public interface MemberService {
    Member findByEmail(String email);
}
