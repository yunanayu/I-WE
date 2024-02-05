package com.iandwe.record.service;

import com.iandwe.record.domain.MotherRecord;
import com.iandwe.record.dto.MotherRecordCreateRequestDto;
import com.iandwe.record.dto.MotherRecordReadReponseDto;
import com.iandwe.record.dto.MotherRecordUpdateRequestDto;
import com.iandwe.record.exception.NoRecordExistException;
import com.iandwe.record.repository.MotherRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MotherRecordServiceImpl implements MotherRecordService {

    private final MotherRecordRepository motherRecordRepository;

    @Override
    @Transactional
    public Boolean create(MotherRecordCreateRequestDto dto) {
        MotherRecord motherRecord = dto.toEntity();
        motherRecordRepository.save(motherRecord);
        return true;
    }

    @Override
    public List<MotherRecordReadReponseDto> findAllByMotherNum(long motherNum) {
        List<MotherRecord> motherRecords = motherRecordRepository.findAllByMotherNum(motherNum);
        if (motherRecords == null || motherRecords.isEmpty()) {
            throw new NoRecordExistException();
        }
        return motherRecords.stream()
                .map(MotherRecordReadReponseDto::from)
                .toList();
    }

    @Override
    @Transactional
    public Boolean update(MotherRecordUpdateRequestDto dto) {
        MotherRecord motherRecord = motherRecordRepository.findByNum(dto.getNum())
                .orElseThrow(NoRecordExistException::new);
        motherRecord.update(dto);
        return true;
    }
}
