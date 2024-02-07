package com.iandwe.record.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GrowthCircumference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int num;

    private int gender;

    private int month;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<Float> circumferences;
}
