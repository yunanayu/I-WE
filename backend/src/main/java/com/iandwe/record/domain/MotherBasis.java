package com.iandwe.record.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class MotherBasis {
    
    // 엄마기준기록번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    // TODO : join
    // 엄마번호
    @JoinColumn(name = "")
    private Long motherNum;

    // 임신직전몸무게
    private float basisWeight;

    // 키
    private float height;
}
