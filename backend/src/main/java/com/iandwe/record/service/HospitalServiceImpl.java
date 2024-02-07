package com.iandwe.record.service;

import com.iandwe.record.domain.Hospital;
import com.iandwe.record.dto.HospitalCreateRequestDto;
import com.iandwe.record.dto.HospitalReadResponseDto;
import com.iandwe.record.dto.HospitalUpdateRequestDto;
import com.iandwe.record.exception.NoHospitalExistException;
import com.iandwe.record.repository.HospitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HospitalServiceImpl implements HospitalService {

    private final HospitalRepository hospitalRepository;

    @Override
    @Transactional
    public Boolean create(HospitalCreateRequestDto dto) {
        Hospital hospital = dto.toEntity();
        hospitalRepository.save(hospital);
        return true;
    }

    @Override
    public List<HospitalReadResponseDto> findAllByTargetAndTargetNum(String target, long targetNum) {
        List<Hospital> hospitals = hospitalRepository.findAllByTargetAndTargetNum(target, targetNum);
//        if (hospitals == null || hospitals.isEmpty()) {
//            throw new NoHospitalExistException();
//        }
        return hospitals.stream()
                .map(HospitalReadResponseDto::from)
                .toList();
    }

    @Override
    @Transactional
    public Boolean update(HospitalUpdateRequestDto dto) {
        Hospital hospital = hospitalRepository.findByNum(dto.getNum())
                .orElseThrow(NoHospitalExistException::new);
        hospital.update(dto);
        return true;
    }
}
