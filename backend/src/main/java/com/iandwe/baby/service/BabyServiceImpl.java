package com.iandwe.baby.service;

import com.iandwe.baby.domain.Baby;
import com.iandwe.baby.dto.*;
import com.iandwe.baby.exception.NoBabyExistException;
import com.iandwe.baby.repository.BabyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BabyServiceImpl implements BabyService {

    private final BabyRepository babyRepository;

    @Override
    public BabyCreateResponseDto create(BabyCreateRequestDto dto) {
        Baby baby = dto.toEntity();
        babyRepository.save(baby);
        return BabyCreateResponseDto.from(baby);
    }

    @Override
    public List<BabyReadResponseDto> findAllByUserNum(long userNum) {
        List<Baby> babies = babyRepository.findAllByUserNum(userNum);
        if (babies == null || babies.isEmpty()) {
            throw new NoBabyExistException();
        }
        return babies.stream()
                .map(BabyReadResponseDto::from)
                .toList();
    }

    @Override
    public void share(BabyShareRequestDto dto) {
        Baby baby = babyRepository.findByNum(dto.getBabyNum())
                .orElseThrow(NoBabyExistException::new);
        baby.share(dto.getFatherNum());
    }

    @Override
    public BabyReadResponseDto update(BabyUpdateRequestDto dto) {
        Baby baby = babyRepository.findByNum(dto.getBabyNum())
                .orElseThrow(NoBabyExistException::new);
        baby.update(dto);
        return BabyReadResponseDto.from(baby);
    }

}
