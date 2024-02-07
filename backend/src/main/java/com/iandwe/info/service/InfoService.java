package com.iandwe.info.service;

import com.iandwe.info.dto.InfoRequestDto;
import com.iandwe.info.dto.InfoResponseDto;

import java.util.List;

public interface InfoService {

    List<InfoResponseDto> findByTargetAndTargetTimeAndCategory(InfoRequestDto dto);
}
