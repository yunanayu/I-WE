package com.iandwe.essential.service;

import com.iandwe.essential.constant.EssentialSearchType;
import com.iandwe.essential.domain.Essential;
import com.iandwe.essential.dto.EssentialResponseDto;
import com.iandwe.essential.exception.NoEssentialExistException;
import com.iandwe.essential.exception.NotSupportSuchTypeException;
import com.iandwe.essential.repository.EssentialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EssentialService {

    private final EssentialRepository essentialRepository;

    public List<EssentialResponseDto> findByTarget(String target) {
        try {
            return EssentialSearchType.valueOf(target).findByTargetType(essentialRepository, target)
                    .stream()
                    .map(EssentialResponseDto::from)
                    .toList();
        } catch (IllegalArgumentException e) {
            throw new NotSupportSuchTypeException();
        }
    }

    public List<EssentialResponseDto> findByTargetTime(String targetTime) {
        List<Essential> essentials = essentialRepository.findAll();
        if (essentials == null || essentials.isEmpty()) {
            throw new NoEssentialExistException();
        }
        return essentials.stream()
                .filter(e -> e.isRange(targetTime))
                .map(EssentialResponseDto::from)
                .toList();
    }

    public EssentialResponseDto findByNum(long num) {
        return EssentialResponseDto.from(essentialRepository.findByNum(num)
                .orElseThrow(NoEssentialExistException::new));
    }
}
