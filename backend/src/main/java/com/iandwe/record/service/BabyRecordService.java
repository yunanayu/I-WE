package com.iandwe.record.service;

import com.iandwe.record.dto.BabyRecordCreateRequestDto;
import com.iandwe.record.dto.BabyRecordReadResponseDto;
import com.iandwe.record.dto.BabyRecordUpdateRequestDto;

import java.util.List;

public interface BabyRecordService {

    Boolean create(BabyRecordCreateRequestDto dto);

    List<BabyRecordReadResponseDto> findAllByBabyNum(long num);

    Boolean update(BabyRecordUpdateRequestDto dto);
}
