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

@Service
@RequiredArgsConstructor
public class MotherBasisServiceImpl implements MotherBasisService {

    private final MotherBasisRepository motherBasisRepository;

    @Override
    @Transactional
    public Boolean create(MotherBasisCreateRequestDto dto) {
        MotherBasis motherBasis = dto.toEntity();
        motherBasisRepository.save(motherBasis);
        return true;
    }

    @Override
    public MotherBasisReadResponseDto findByMotherNum(long num) {
        MotherBasis motherBasis = motherBasisRepository.findByMotherNum(num).orElseThrow(NoRecordExistException::new);
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
