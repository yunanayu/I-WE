package com.iandwe.info.service;

import com.iandwe.info.domain.Info;
import com.iandwe.info.dto.InfoRequestDto;
import com.iandwe.info.dto.InfoResponseDto;
import com.iandwe.info.exception.NoInfoExistException;
import com.iandwe.info.repository.InfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InfoServiceImpl implements InfoService {

    private final InfoRepository infoRepository;

    @Override
    public List<InfoResponseDto> findByTargetAndTargetTimeAndCategory(InfoRequestDto dto) {
        List<Info> infos = infoRepository.findByTargetAndTargetTimeAndCategory(dto);
        if (infos == null || infos.isEmpty()) {
            throw new NoInfoExistException();
        }
        return infos.stream()
                .map(InfoResponseDto::from)
                .toList();
    }
}
