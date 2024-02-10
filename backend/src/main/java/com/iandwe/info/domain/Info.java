package com.iandwe.info.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Info {

    /**
     * //Info
     * info_num     : Id
     * title        : 한줄요약
     * infoDetail   : 상세내용 -> 상세페이지에서 보여줄 자세한 내용
     * target       : 정보의 주체 (누구에 대한 정보인지) 산모/아이
     * category     : 정보의 카테고리
     * - 변화 정보 : ex) 이 시기에 쑥쑥이는 손가락이 자라고있어요
     * - 권유 정보 : ex) 빈혈 예방을 위해 엽산이 함유된 철분제를 복용하세요
     * * 분류 이유 : 남편에게 필요한 정보를 특정하기 위해 분류 -> 남편을 특정해서 제공하는 정보는 변화정보보단 권유정보가 어울리지 않을까
     * targetTime   : 시기
     * - 출산(예정)일 기준
     * - 출산 전 : B1(임신주) ~ B42   -> 단위 : 주 (week)
     * - 출산 후 : A1 ~ An           -> 단위 : 달 (month)
     * <p>
     * params = {
     * target,          // 정보의 주체
     * targetTime,      // 시기
     * category,        // 카테고리
     * cnt              // 정보갯수
     * }
     * // 사용 예시
     * // 남편에게 제공할 임신 24주차 산모의 맞춤 데이터 3개
     * // getInfo(산모,B24,권유, 3)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    private String target;

    @Column(length = 500)
    private String content;

    private char category;

    private String startTime;

    private String endTime;
}
