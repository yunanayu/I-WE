package com.iandwe.record.service;

import com.iandwe.record.dto.MotherRecordCreateRequestDto;
import com.iandwe.record.dto.MotherRecordReadReponseDto;
import com.iandwe.record.dto.MotherRecordUpdateRequestDto;

import java.util.List;

public interface MotherRecordService {

    MotherRecordReadReponseDto create(MotherRecordCreateRequestDto dto);

    List<MotherRecordReadReponseDto> findAllByMotherNum(long motherNum);

    MotherRecordReadReponseDto update(MotherRecordUpdateRequestDto dto);
}
