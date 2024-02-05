package com.iandwe.baby.service;

import com.iandwe.baby.domain.Baby;
import com.iandwe.baby.dto.*;
import com.iandwe.baby.exception.NoBabyExistException;
import com.iandwe.baby.repository.BabyRepository;
import com.iandwe.checker.service.generator.CheckerGenerator;
import com.iandwe.family.service.FamilyService;
import com.iandwe.member.domain.Member;
import com.iandwe.member.domain.ParentType;
import com.iandwe.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BabyServiceImpl implements BabyService {

    private final BabyRepository babyRepository;

    private final CheckerGenerator checkerGenerator;

    private final MemberRepository memberRepository;

    private final FamilyService familyService;

    @Transactional
    @Override
    public BabyCreateResponseDto create(BabyCreateRequestDto dto) {
        Baby baby = dto.toEntity();

        Member savedMember = memberRepository.findByNum(dto.getMotherNum()).orElseThrow();

        if (savedMember.getFamilyNum() != null) { // 존재 할 때
            baby.share(familyService.findFatherByNum(savedMember.getFamilyNum()));
        } else {
            familyService.create(savedMember.getNum());
        }

        babyRepository.save(baby);

        if (isMother(savedMember.getParentType())) {
            checkerGenerator.generateMotherCheckerData(savedMember.getNum(), baby.getNum());
            // family 에서 num 으로 조회 시 familyNum 이 없을 때, family 만들어주고, 있으면 거기서 fathernum도 baby에 가져와서 넣어준다
        }

        checkerGenerator.generateBabyCheckerData(baby.getNum());

        return BabyCreateResponseDto.from(baby);
    }

    @Override
    public List<BabyReadResponseDto> findAllByUserNum(long userNum) {
        List<Baby> babies = babyRepository.findByMotherNumOrFatherNum(userNum);
        if (babies == null || babies.isEmpty()) {
            throw new NoBabyExistException();
        }
        return babies.stream()
                .map(BabyReadResponseDto::from)
                .toList();
    }

    @Override
    @Transactional
    public BabyReadResponseDto update(BabyUpdateRequestDto dto) {
        Baby baby = babyRepository.findByNum(dto.getBabyNum())
                .orElseThrow(NoBabyExistException::new);
        baby.update(dto);
        return BabyReadResponseDto.from(baby);
    }

    private static boolean isMother(ParentType type) {
        return type.equals(ParentType.MOTHER);
    }
}
