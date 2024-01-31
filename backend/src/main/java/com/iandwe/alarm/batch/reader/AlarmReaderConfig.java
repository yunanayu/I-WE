package com.iandwe.alarm.batch.reader;

import com.iandwe.alarm.batch.job.AlarmJobConfig;
import com.iandwe.checker.domain.BabyChecker;
import com.iandwe.checker.domain.MotherChecker;
import jakarta.persistence.EntityManagerFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class AlarmReaderConfig {

    private final EntityManagerFactory emf;

    @StepScope
    @Bean
    public JpaPagingItemReader<BabyChecker> babyAlarmReader() {
        String query = ("SELECT b FROM BabyChecker b WHERE b.complete = false");
        return new JpaPagingItemReaderBuilder<BabyChecker>()
                .entityManagerFactory(emf)
                .queryString(query)
                .pageSize(AlarmJobConfig.CHUNK_SIZE)
                .name("babyAlarmReader")
                .build();
    }

    @StepScope
    @Bean
    public JpaPagingItemReader<MotherChecker> motherAlarmReader() {
        String query = ("SELECT m FROM MotherChecker m WHERE m.complete = false");
        return new JpaPagingItemReaderBuilder<MotherChecker>()
                .entityManagerFactory(emf)
                .queryString(query)
                .pageSize(AlarmJobConfig.CHUNK_SIZE)
                .name("motherAlarmReader")
                .build();
    }

}
