package com.iandwe.baby.service;

import com.iandwe.baby.dto.*;

import java.util.List;

public interface BabyService {

//    BabyCreateResponseDto create(BabyCreateRequestDto dto);

    List<BabyReadResponseDto> create(BabyCreateRequestDto dto);

    List<BabyReadResponseDto> findAllByUserNum(long userNum);

    BabyReadResponseDto update(BabyUpdateRequestDto dto);

    void kill(long babyNum);
}
