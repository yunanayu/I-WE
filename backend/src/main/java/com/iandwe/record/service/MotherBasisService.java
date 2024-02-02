package com.iandwe.record.service;

import com.iandwe.record.dto.MotherBasisCreateRequestDto;
import com.iandwe.record.dto.MotherBasisReadResponseDto;
import com.iandwe.record.dto.MotherBasisUpdateRequestDto;

public interface MotherBasisService {

    Boolean create(MotherBasisCreateRequestDto dto);

    MotherBasisReadResponseDto findByMotherNum(long motherNum);

    Boolean update(MotherBasisUpdateRequestDto dto);
}
