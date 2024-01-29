package com.iandwe.record.service;

import com.iandwe.record.domain.BabyRecord;
import com.iandwe.record.dto.BabyRecordCreateRequestDto;
import com.iandwe.record.dto.BabyRecordReadResponseDto;
import com.iandwe.record.dto.BabyRecordUpdateRequestDto;
import com.iandwe.record.exception.NoRecordExistException;
import com.iandwe.record.repository.BabyRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BabyRecordServiceImpl implements BabyRecordService{

     private final BabyRecordRepository babyRecordRepository;
    @Override
    public Boolean create(BabyRecordCreateRequestDto dto) {
        BabyRecord babyRecord = dto.toEntity();
        babyRecordRepository.save(babyRecord);
        return true;
    }

    @Override
    public List<BabyRecordReadResponseDto> findAllByBabyNum(long num) {
        List<BabyRecord> babyRecords = babyRecordRepository.findAllByBabyNum(num);
        if(babyRecords == null || babyRecords.isEmpty()){
            throw new NoRecordExistException();
        }
        return babyRecords.stream()
                .map(BabyRecordReadResponseDto::from)
                .toList();
    }

    @Override
    public Boolean update(BabyRecordUpdateRequestDto dto) {
        BabyRecord babyRecord = babyRecordRepository.findByNum(dto.getBabyNum())
                .orElseThrow(NoRecordExistException::new);
        babyRecord.update(dto);
        return true;
    }
}
