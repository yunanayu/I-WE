package com.iandwe.alarm.batch.job;

import com.iandwe.checker.domain.BabyChecker;
import com.iandwe.checker.domain.MotherChecker;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobScope;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@RequiredArgsConstructor
public class AlarmJobConfig {

    public static final Integer CHUNK_SIZE = 5;

    @Bean
    public Job alarmJob(JobRepository jobRepository, Step babyAlarmStep, Step motherAlarmStep) {
        return new JobBuilder("alarmJob", jobRepository)
                .incrementer(new RunIdIncrementer())
                .start(babyAlarmStep)
                .next(motherAlarmStep)
                .build();
    }

    @JobScope
    @Bean
    public Step babyAlarmStep(JobRepository jobRepository, PlatformTransactionManager transactionManager,
                              ItemReader babyAlarmReader, ItemWriter babyAlarmWriter, TaskExecutor taskExecutor) {
        return new StepBuilder("babyAlarmStep", jobRepository)
                .<BabyChecker, BabyChecker>chunk(CHUNK_SIZE, transactionManager)
                .reader(babyAlarmReader)
                .writer(babyAlarmWriter)
                .taskExecutor(taskExecutor)
                .build();
    }

    @JobScope
    @Bean
    public Step motherAlarmStep(JobRepository jobRepository, PlatformTransactionManager transactionManager,
                                ItemReader motherAlarmReader, ItemWriter motherAlarmWriter, TaskExecutor taskExecutor) {
        return new StepBuilder("motherAlarmStep", jobRepository)
                .<MotherChecker, MotherChecker>chunk(CHUNK_SIZE, transactionManager)
                .reader(motherAlarmReader)
                .writer(motherAlarmWriter)
                .taskExecutor(taskExecutor)
                .build();
    }

    @Bean
    public TaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();
        taskExecutor.setCorePoolSize(CHUNK_SIZE);
        taskExecutor.setMaxPoolSize(CHUNK_SIZE * 2);
        taskExecutor.setThreadNamePrefix("async-thread");
        return taskExecutor;
    }

}
