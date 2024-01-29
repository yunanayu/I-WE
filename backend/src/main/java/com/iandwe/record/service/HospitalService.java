package com.iandwe.record.service;

import com.iandwe.record.dto.HospitalCreateRequestDto;
import com.iandwe.record.dto.HospitalReadResponseDto;
import com.iandwe.record.dto.HospitalUpdateRequestDto;

import java.util.List;

public interface HospitalService {

    Boolean create(HospitalCreateRequestDto dto);

    List<HospitalReadResponseDto> findAllByNum(Long num);

    Boolean update(HospitalUpdateRequestDto dto);
}
