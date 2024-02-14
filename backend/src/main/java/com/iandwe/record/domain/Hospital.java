package com.iandwe.record.domain;

import com.iandwe.record.dto.HospitalUpdateRequestDto;
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
public class Hospital {

    // 진료기록번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    // 대상 : 산모 or 아이
    private String target;

    // 대상번호
    private Long targetNum;

    // 검진목적 (간편정보에 보일 문장)
    private String title;

    // 진료병원
    private String hospitalName;

    // 담당의
    private String doctor;

    // 검진날짜
    private LocalDate hospitalDate;

    // 검진내용
    private String content;

    // 검진결과
    private String result;

    // 의사소견
    private String comment;

    public void update(HospitalUpdateRequestDto dto) {
        if (dto.getTarget() != null) {
            this.target = dto.getTarget();
        }
        if (dto.getTargetNum() != null) {
            this.targetNum = dto.getTargetNum();
        }
        if (dto.getTitle() != null) {
            this.title = dto.getTitle();
        }
        if (dto.getHospitalName() != null) {
            this.hospitalName = dto.getHospitalName();
        }
        if (dto.getDoctor() != null) {
            this.doctor = dto.getDoctor();
        }
        if (dto.getHospitalDate() != null) {
            this.hospitalDate = dto.getHospitalDate();
        }
        if (dto.getContent() != null) {
            this.content = dto.getContent();
        }
        if (dto.getResult() != null) {
            this.result = dto.getResult();
        }
        if (dto.getComment() != null) {
            this.comment = dto.getComment();
        }

    }
}
