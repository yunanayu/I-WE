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

    Boolean update(BabyRecordUpdateRequestDto dto, List<MultipartFile> files);

    void create(List<MultipartFile> files, BabyRecordCreateRequestDto dto);
}
