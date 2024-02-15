package com.iandwe.record.service;

import com.iandwe.record.dto.BabyRecordCreateRequestDto;
import com.iandwe.record.dto.BabyRecordReadResponseDto;
import com.iandwe.record.dto.BabyRecordUpdateRequestDto;
import jakarta.mail.Multipart;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BabyRecordService {

//    Boolean create(BabyRecordCreateRequestDto dto);

    List<BabyRecordReadResponseDto> findAllByBabyNum(long babyNum);

    BabyRecordReadResponseDto update(BabyRecordUpdateRequestDto dto, List<MultipartFile> files);

    BabyRecordReadResponseDto create(List<MultipartFile> files, BabyRecordCreateRequestDto dto);
}
