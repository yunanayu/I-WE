package com.iandwe.record.service;

import com.iandwe.record.dto.HospitalCreateRequestDto;
import com.iandwe.record.dto.HospitalReadResponseDto;
import com.iandwe.record.dto.HospitalUpdateRequestDto;

import java.util.List;

public interface HospitalService {

    Boolean create(HospitalCreateRequestDto dto);

    List<HospitalReadResponseDto> findAllByTargetAndTargetNum(String target, long targetNum);

    Boolean update(HospitalUpdateRequestDto dto);
}
