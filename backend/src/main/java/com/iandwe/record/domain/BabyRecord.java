package com.iandwe.record.domain;

import com.iandwe.record.dto.BabyRecordUpdateRequestDto;
import com.iandwe.record.dto.MotherRecordUpdateRequestDto;
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
public class BabyRecord {

    // 아이기록번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    // 아이번호
    private Long babyNum;

    // 키
    private float height;

    // 몸무게
    private float weight;

    // 머리둘레
    private float circumference;

    // 날짜
    private LocalDate recordDate;

    // 사진
    private String babyImage;
    public void update(BabyRecordUpdateRequestDto dto){
        if(dto.getBabyNum() != null){
            this.babyNum = dto.getBabyNum();
        }
        if(dto.getHeight() != 0.0F){
            this.height = dto.getHeight();
        }
        if(dto.getWeight() != 0.0F){
            this.weight = dto.getWeight();
        }
        if(dto.getCircumference() != 0.0F){
            this.circumference = dto.getCircumference();
        }
        if(dto.getRecordDate() != null){
            this.recordDate = dto.getRecordDate();
        }
        if(dto.getBabyImage() != null){
            this.babyImage = dto.getBabyImage();
        }
    }
}
