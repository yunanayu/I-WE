package com.iandwe.baby.domain;

import com.iandwe.baby.dto.BabyUpdateRequestDto;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Slf4j
public class Baby {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    private Long motherNum;

    private Long fatherNum;

    private String name;

    private int gender;

    private LocalDate pregnancyDate;

    private boolean status;

    private LocalDate birth;

    public void share(Long fatherNum) {
        this.fatherNum = fatherNum;
    }

    public void update(BabyUpdateRequestDto dto) {
        if (dto.getName() != null) {
            this.name = dto.getName();
        }

        if (dto.getGender() != null) {
            this.gender = dto.getGender();
        }

        if (dto.getPregnancyDate() != null) {
            this.pregnancyDate = dto.getPregnancyDate();
        }

        if (dto.isStatus()) {
            this.status = true;
        }

        if (dto.getBirth() != null) {
            this.birth = dto.getBirth();
        }
    }

    public String getTargetTime() {
        long diffSec = 0L;
        String targetTime = "";
        try {
            if (this.status) {
                targetTime += "A";
                diffSec = parseDate(LocalDate.now()) - parseDate(birth);
                targetTime += ((parseSecToDay(diffSec) / 28) + 1);
            } else {
                targetTime += "B";
                diffSec = parseDate(LocalDate.now()) - parseDate(pregnancyDate);
                targetTime += ((parseSecToDay(diffSec) / 7) + 1);
            }
        } catch (ParseException e) {
            log.info("Baby Parse Exception : {}", e.getMessage());
        }
        return targetTime;
    }

    private long parseDate(LocalDate date) throws ParseException {
        return new SimpleDateFormat("yyyy-MM-dd").parse(String.valueOf(date)).getTime() / 1000;
    }

    private long parseSecToDay(long diffSec) {
        return diffSec / (24 * 60 * 60);
    }
}
