package com.iandwe.record.service;

import com.iandwe.record.domain.MotherBasis;
import com.iandwe.record.dto.MotherBasisCreateRequestDto;
import com.iandwe.record.dto.MotherBasisReadResponseDto;
import com.iandwe.record.dto.MotherBasisUpdateRequestDto;
import com.iandwe.record.exception.NoRecordExistException;
import com.iandwe.record.repository.MotherBasisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MotherBasisServiceImpl implements MotherBasisService {

    private final MotherBasisRepository motherBasisRepository;

    @Override
    @Transactional
    public Boolean create(MotherBasisCreateRequestDto dto) {
        if (motherBasisRepository.findByMotherNum(dto.getMotherNum()).isPresent()) {
            update(MotherBasisUpdateRequestDto.from(dto));
        } else {
            MotherBasis motherBasis = dto.toEntity();
            motherBasisRepository.save(motherBasis);
        }
        return true;
    }

    @Override
    public MotherBasisReadResponseDto findByMotherNum(long motherNum) {
        MotherBasis motherBasis = motherBasisRepository.findByMotherNum(motherNum).orElseThrow(NoRecordExistException::new);
        return MotherBasisReadResponseDto.from(motherBasis);
    }

    @Override
    @Transactional
    public Boolean update(MotherBasisUpdateRequestDto dto) {
        MotherBasis motherBasis = motherBasisRepository.findByMotherNum(dto.getMotherNum())
                .orElseThrow(NoRecordExistException::new);
        motherBasis.update(dto);
        return true;
    }
}
