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

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class Baby {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long num;

    private Long motherNum;

    private Long fatherNum;

    private String name;

    private String gender;

    private LocalDate pregnancyDate;

    private boolean status;

    private LocalDate birth;

    public void share(long fatherNum) {
        this.fatherNum = fatherNum;
    }

    public void update(BabyUpdateRequestDto dto) {
        if(dto.getName() != null) {
            this.name = dto.getName();
        }

        if(dto.getGender() != null) {
            this.gender = dto.getGender();
        }

        if(dto.getPregnancyDate() != null) {
            this.pregnancyDate = dto.getPregnancyDate();
        }

        if(dto.isStatus()) {
            this.status = true;
        }

        if(dto.getBirth() != null) {
            this.birth = dto.getBirth();
        }
    }

}
