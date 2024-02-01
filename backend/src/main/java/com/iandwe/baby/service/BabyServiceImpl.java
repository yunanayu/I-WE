package com.iandwe.baby.service;

import com.iandwe.baby.domain.Baby;
import com.iandwe.baby.dto.*;
import com.iandwe.baby.exception.NoBabyExistException;
import com.iandwe.baby.repository.BabyRepository;
import com.iandwe.checker.service.generator.CheckerGenerator;
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

    @Transactional
    @Override
    public BabyCreateResponseDto create(BabyCreateRequestDto dto) {
        Baby baby = dto.toEntity();

        babyRepository.save(baby);
        checkerGenerator.generateBabyCheckerData(baby.getNum());

        Member savedMember = memberRepository.findByNum(dto.getMotherNum()).orElseThrow();

        if (isMother(savedMember.getParentType())) {
            checkerGenerator.generateMotherCheckerData(savedMember.getNum(), baby.getNum());
        }

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
    public void share(BabyShareRequestDto dto) {
        Baby baby = babyRepository.findByNum(dto.getBabyNum())
                .orElseThrow(NoBabyExistException::new);
        baby.share(dto.getFatherNum());
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
