package com.iandwe.record.service;

import com.iandwe.record.domain.MotherRecord;
import com.iandwe.record.dto.MotherRecordCreateRequestDto;
import com.iandwe.record.dto.MotherRecordReadReponseDto;
import com.iandwe.record.dto.MotherRecordUpdateRequestDto;
import com.iandwe.record.exception.NoMotherRecordExistException;
import com.iandwe.record.repository.MotherRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MotherRecordServiceImpl implements MotherRecordService{

    private final MotherRecordRepository motherRecordRepository;

    @Override
    @Transactional
    public Boolean create(MotherRecordCreateRequestDto dto) {
        MotherRecord motherRecord = dto.toEntity();
        motherRecordRepository.save(motherRecord);
        return true;
    }

    @Override
    public List<MotherRecordReadReponseDto> findAllByNum(Long num) {
        List<MotherRecord> motherRecords = motherRecordRepository.findAllByNum(num);
        if(motherRecords == null || motherRecords.isEmpty()){
            throw new NoMotherRecordExistException();
        }
        return motherRecords.stream()
                .map(MotherRecordReadReponseDto::from)
                .toList();
    }

    @Override
    @Transactional
    public Boolean update(MotherRecordUpdateRequestDto dto) {
        MotherRecord motherRecord = motherRecordRepository.findByNum(dto.getNum())
                .orElseThrow(NoMotherRecordExistException::new);
        motherRecord.update(dto);
        return true;
    }
}
