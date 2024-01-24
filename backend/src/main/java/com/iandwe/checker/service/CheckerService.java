package com.iandwe.checker.service;

import com.iandwe.baby.exception.NoBabyExistException;
import com.iandwe.checker.domain.BabyChecker;
import com.iandwe.checker.domain.MotherChecker;
import com.iandwe.checker.dto.CheckerResponseDto;
import com.iandwe.checker.dto.CheckerUpdateRequestDto;
import com.iandwe.checker.exception.NoCheckerExistException;
import com.iandwe.checker.repository.BabyCheckerRepository;
import com.iandwe.checker.repository.MotherCheckerRepository;
import com.iandwe.essential.domain.Essential;
import com.iandwe.essential.exception.NoEssentialExistException;
import com.iandwe.essential.repository.EssentialRepository;
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

    public List<CheckerResponseDto> findByMotherNum(long num) {
        List<MotherChecker> motherCheckers = motherCheckerRepository.findByMotherNum(num);
        if (isEmptyResult(motherCheckers)) {
            // TODO : Member 의 No member exist exception 을 작성 후 throw 할 것.
        }

        return motherCheckers.stream().map(checker -> {
                    Essential essential = essentialRepository.findByNum(checker.getEssentialNum()).orElseThrow(NoEssentialExistException::new);
                    return CheckerResponseDto.of(essential, checker.isComplete());
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
                    return CheckerResponseDto.of(essential, checker.isComplete());
                }
        ).collect(Collectors.toList());
    }

    @Transactional
    public void updateComplete(CheckerUpdateRequestDto requestDto) {
        if (requestDto.getTarget().equals("baby")) {
            BabyChecker babyChecker = babyCheckerRepository.findByBabyNumAndEssentialNum(requestDto.getTargetNum(), requestDto.getEssentialNum())
                    .orElseThrow(NoCheckerExistException::new);
            babyChecker.updateComplete(requestDto.isComplete());
        } else if (requestDto.getTarget().equals("mother")) {
            MotherChecker motherChecker = motherCheckerRepository.findByMotherNumAndEssentialNum(requestDto.getTargetNum(), requestDto.getEssentialNum())
                    .orElseThrow(NoCheckerExistException::new);
            motherChecker.updateComplete(requestDto.isComplete());
        }
    }

    private static boolean isEmptyResult(List<?> result) {
        return result == null || result.isEmpty();
    }

    // TODO : 가입시 산모, 아이 생성시 아기의 data를 추가해주는 메소드 작성 필요
}
