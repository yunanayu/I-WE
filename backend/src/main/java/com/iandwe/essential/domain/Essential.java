package com.iandwe.essential.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Essential {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    private String title;

    private String description;

    private String startTime;

    private String endTime;

    private String target;

    private String category;

    public boolean isRange(String targetTime) {
        char isPregnant = targetTime.charAt(0);
        if (startTime.charAt(0) != isPregnant) {
            return false;
        }

        int target = extractTime(targetTime);
        int start = extractTime(startTime);
        int end = extractTime(endTime);

        return target >= start && target <= end;
    }

    private static int extractTime(String targetTime){
        return Integer.parseInt(targetTime.substring(1));
    }

}
