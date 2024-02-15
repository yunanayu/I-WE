package com.iandwe.checker.service;

import com.iandwe.baby.exception.NoBabyExistException;
import com.iandwe.checker.domain.BabyChecker;
import com.iandwe.checker.domain.MotherChecker;
import com.iandwe.checker.dto.CheckerMotherResponseDto;
import com.iandwe.checker.dto.CheckerResponseDto;
import com.iandwe.checker.dto.CheckerUpdateRequestDto;
import com.iandwe.checker.exception.NoCheckerExistException;
import com.iandwe.checker.repository.BabyCheckerRepository;
import com.iandwe.checker.repository.MotherCheckerRepository;
import com.iandwe.essential.domain.Essential;
import com.iandwe.essential.exception.NoEssentialExistException;
import com.iandwe.essential.repository.EssentialRepository;
import com.iandwe.member.exception.NoMemberExistException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CheckerService {

    private final BabyCheckerRepository babyCheckerRepository;

    private final MotherCheckerRepository motherCheckerRepository;

    private final EssentialRepository essentialRepository;

    public List<CheckerMotherResponseDto> findByMotherNum(long num) {
        List<MotherChecker> motherCheckers = motherCheckerRepository.findByMotherNum(num);
        if (isEmptyResult(motherCheckers)) {
            throw new NoMemberExistException();
        }

        return motherCheckers.stream().map(checker -> {
                    Essential essential = essentialRepository.findByNum(checker.getEssentialNum()).orElseThrow(NoEssentialExistException::new);
                    return CheckerMotherResponseDto.of(essential, checker);
                }
        ).collect(Collectors.toList());
    }

    public List<CheckerResponseDto> findByBabyNum(long num) {
        List<BabyChecker> babyCheckers = babyCheckerRepository.findByBabyNum(num);
        if (isEmptyResult(babyCheckers)) {
            throw new NoBabyExistException();
        }

        return babyCheckers.stream().map(checker -> {
                    Essential essential = essentialRepository.findByNum(checker.getEssentialNum())
                            .orElseThrow(NoEssentialExistException::new);
                    return CheckerResponseDto.of(essential, checker);
                }
        ).collect(Collectors.toList());
    }

    @Transactional
    public void updateComplete(CheckerUpdateRequestDto requestDto) { // update 넘어온 babyNum 처리
        if (requestDto.getTarget().equals("baby")) {
            BabyChecker babyChecker = babyCheckerRepository.findByBabyNumAndEssentialNum(requestDto.getTargetNum(), requestDto.getEssentialNum())
                    .orElseThrow(NoCheckerExistException::new);
            babyChecker.updateComplete(requestDto.getIsComplete());
        } else if (requestDto.getTarget().equals("mother")) {
            MotherChecker motherChecker = motherCheckerRepository.findByMotherNumAndEssentialNumAndBabyNum(requestDto.getTargetNum(), requestDto.getEssentialNum(), requestDto.getBabyNum())
                    .orElseThrow(NoCheckerExistException::new);
            motherChecker.updateComplete(requestDto.getIsComplete());
        }
    }

    private static boolean isEmptyResult(List<?> result) {
        return result == null || result.isEmpty();
    }

}
