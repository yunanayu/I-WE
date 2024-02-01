package com.iandwe.checker.service.generator;

import com.iandwe.checker.domain.BabyChecker;
import com.iandwe.checker.domain.MotherChecker;
import com.iandwe.checker.repository.BabyCheckerRepository;
import com.iandwe.checker.repository.MotherCheckerRepository;
import com.iandwe.essential.domain.Essential;
import com.iandwe.essential.repository.EssentialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CheckerGenerator {

    private final BabyCheckerRepository babyCheckerRepository;

    private final MotherCheckerRepository motherCheckerRepository;

    private final EssentialRepository essentialRepository;

    public void generateBabyCheckerData(long babyNum) {
        List<Essential> babyEssentials = essentialRepository.findAll().stream()
                .filter(e -> e.getTarget().equals("baby"))
                .toList();

        List<BabyChecker> babyCheckers = babyEssentials.stream()
                .map(e -> BabyChecker.builder()
                        .babyNum(babyNum)
                        .complete(false)
                        .essentialNum(e.getNum())
                        .build())
                .toList();

        babyCheckerRepository.saveAll(babyCheckers);
    }

    // TODO : Member 에서 산모 가입 시 메소드 연결 필요
    public void generateMotherCheckerData(long motherNum, long babyNum) {
        List<Essential> motherEssentials = essentialRepository.findAll().stream()
                .filter(e -> e.getTarget().equals("mother"))
                .toList();

        List<MotherChecker> motherCheckers = motherEssentials.stream().map(e -> MotherChecker.builder()
                        .motherNum(motherNum)
                        .complete(false)
                        .babyNum(babyNum)
                        .essentialNum(e.getNum())
                        .build())
                .toList();

        motherCheckerRepository.saveAll(motherCheckers);
    }

}
