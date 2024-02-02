package com.iandwe.common;

import com.iandwe.essential.domain.Essential;
import com.iandwe.essential.repository.EssentialRepository;
import com.iandwe.essential.util.EssentialLoader;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DBInitializer implements ApplicationRunner {

    private final EssentialRepository essentialRepository;

    private final EssentialLoader essentialLoader;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        List<String[]> datas = essentialLoader.getCommerces();
        List<Essential> essentials = new ArrayList<>();

        for(String[] data : datas) {
            System.out.println(data[5]);
            Essential essential = Essential.builder()
                    .title(data[0])
                    .description(data[1])
                    .startTime(data[2])
                    .endTime(data[3])
                    .target(data[4])
                    .category(data[5])
                    .build();
            essentials.add(essential);
        }

        essentialRepository.saveAll(essentials);
    }
}
