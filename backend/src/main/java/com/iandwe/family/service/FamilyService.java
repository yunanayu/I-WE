package com.iandwe.family.service;

import com.iandwe.baby.domain.Baby;
import com.iandwe.baby.exception.NoBabyExistException;
import com.iandwe.baby.repository.BabyRepository;
import com.iandwe.family.dto.FamilyCodeResponseDto;
import com.iandwe.family.dto.FamilyShareRequestDto;
import com.iandwe.family.exception.NoFamilyExistException;
import com.iandwe.family.repository.FamilyRepository;
import com.iandwe.family.domain.Family;
import com.iandwe.family.util.FamilyCodeGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FamilyService {

    private final FamilyRepository familyRepository;

    private final BabyRepository babyRepository;

    @Transactional
    public void share(FamilyShareRequestDto familyShareRequestDto) {
        Family family = familyRepository.findByShareCode(familyShareRequestDto.getCode()).orElseThrow(NoFamilyExistException::new);
        family.share(familyShareRequestDto.getFatherNum());
        familyRepository.save(family);

        shareBabies(family.getMother(), familyShareRequestDto.getFatherNum());
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void shareBabies(long motherNum, long fatherNum) {
        List<Baby> babies = babyRepository.findByMotherNumOrFatherNum(motherNum);
        if (babies == null || babies.isEmpty()) {
            throw new NoBabyExistException();
        }
        babies.forEach(baby -> baby.share(fatherNum));
        babyRepository.saveAll(babies);
    }

    @Transactional(readOnly = true)
    public FamilyCodeResponseDto findCodeByMotherNum(long motherNum) {
        Family family = familyRepository.findByMother(motherNum).orElseThrow(NoFamilyExistException::new);
        return FamilyCodeResponseDto.from(family);
    }

    @Transactional
    public Long create(long motherNum) {
        String code = FamilyCodeGenerator.generateCode();
        Family family = Family.builder()
                .mother(motherNum)
                .shareCode(code)
                .build();
        familyRepository.save(family);
        return family.getNum();
    }

    public Family findByNum(Long familyNum) {
        return familyRepository.findByNum(familyNum);
    }

    public Long findFatherByNum(Long familyNum) {
        return familyRepository.findFatherByNum(familyNum);
        // TODO : Father 에 대한 exception 추가 필요
    }
}
