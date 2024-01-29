package com.iandwe.baby.service;

import com.iandwe.baby.dto.*;

import java.util.List;

public interface BabyService {

    BabyCreateResponseDto create(BabyCreateRequestDto dto);

    List<BabyReadResponseDto> findAllByUserNum(long userNum);

    void share(BabyShareRequestDto dto);

    BabyReadResponseDto update(BabyUpdateRequestDto dto);

}
