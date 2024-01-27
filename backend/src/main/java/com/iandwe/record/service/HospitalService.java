package com.iandwe.record.service;

import com.iandwe.record.dto.HospitalCreateRequestDto;
import com.iandwe.record.dto.HospitalReadResponseDto;
import com.iandwe.record.dto.HospitalUpdateRequestDto;

import java.util.List;

public interface HospitalService {

    List<HospitalReadResponseDto> findAllByNum(Long num);

    Boolean update(HospitalUpdateRequestDto dto);

    Boolean create(HospitalCreateRequestDto dto);
}
