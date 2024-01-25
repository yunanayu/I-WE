package com.iandwe.baby.service;

import com.iandwe.baby.domain.Baby;
import com.iandwe.baby.dto.*;
import com.iandwe.baby.exception.NoBabyExistException;
import com.iandwe.baby.repository.BabyRepository;
import com.iandwe.checker.service.generator.CheckerGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BabyServiceImpl implements BabyService {

    private final BabyRepository babyRepository;

    private final CheckerGenerator checkerGenerator;

    @Transactional
    @Override
    public BabyCreateResponseDto create(BabyCreateRequestDto dto) {
        Baby baby = dto.toEntity();
        babyRepository.save(baby);
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

}
