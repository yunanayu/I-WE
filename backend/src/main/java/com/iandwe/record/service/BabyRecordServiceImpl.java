package com.iandwe.record.service;

import com.iandwe.baby.dto.BabyReadResponseDto;
import com.iandwe.file.util.S3Uploader;
import com.iandwe.record.domain.BabyRecord;
import com.iandwe.record.dto.BabyRecordCreateRequestDto;
import com.iandwe.record.dto.BabyRecordReadResponseDto;
import com.iandwe.record.dto.BabyRecordUpdateRequestDto;
import com.iandwe.record.exception.NoRecordExistException;
import com.iandwe.record.repository.BabyRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BabyRecordServiceImpl implements BabyRecordService {

    private final BabyRecordRepository babyRecordRepository;
    private final S3Uploader uploader;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

//    @Override
//    @Transactional
//    public Boolean create(BabyRecordCreateRequestDto dto) {
//        BabyRecord babyRecord = dto.toEntity();
//        babyRecordRepository.save(babyRecord);
//        return true;
//    }

    @Override
    public List<BabyRecordReadResponseDto> findAllByBabyNum(long babyNum) {
        List<BabyRecord> babyRecords = babyRecordRepository.findAllByBabyNum(babyNum);
        if (babyRecords == null || babyRecords.isEmpty()) {
            throw new NoRecordExistException();
        }
        return babyRecords.stream()
                .map(BabyRecordReadResponseDto::from)
                .toList();
    }

    @Override
    @Transactional
    public Boolean update(BabyRecordUpdateRequestDto dto, List<MultipartFile> files) {
        BabyRecord babyRecord = babyRecordRepository.findByNum(dto.getNum())
                .orElseThrow(NoRecordExistException::new);
        // files 를 string 으로 바군 후 update 진행, null 과 empty 확인
        if (files != null && !files.isEmpty()) {
            List<String> images = uploader.storeImages("record", files);
            babyRecord.update(dto, images);
        }
        return true;
    }

    @Override
    public BabyRecordReadResponseDto create(List<MultipartFile> files, BabyRecordCreateRequestDto dto) {
        List<String> images = new ArrayList<>();
        if (files != null && !files.isEmpty()) {
            images = uploader.storeImages("record", files);
        }

        BabyRecord babyRecord = dto.toEntity(images);

        babyRecordRepository.save(babyRecord);
        return BabyRecordReadResponseDto.from(babyRecord);
    }
}
