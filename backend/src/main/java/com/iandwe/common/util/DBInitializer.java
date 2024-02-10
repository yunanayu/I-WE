package com.iandwe.common.util;

import com.iandwe.essential.domain.Essential;
import com.iandwe.essential.repository.EssentialRepository;
import com.iandwe.info.domain.Info;
import com.iandwe.info.repository.InfoRepository;
import com.iandwe.record.domain.GrowthCircumference;
import com.iandwe.record.domain.GrowthHeight;
import com.iandwe.record.domain.GrowthWeight;
import com.iandwe.record.repository.GrowthCircumferenceRepository;
import com.iandwe.record.repository.GrowthHeightRepository;
import com.iandwe.record.repository.GrowthWeightRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
@RequiredArgsConstructor
public class DBInitializer implements ApplicationRunner {

    private final CSVDataLoader csvDataLoader;

    private final EssentialRepository essentialRepository;

    private final GrowthHeightRepository growthHeightRepository;

    private final GrowthWeightRepository growthWeightRepository;

    private final GrowthCircumferenceRepository growthCircumferenceRepository;

    private final InfoRepository infoRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        saveEssentials();
        saveGrowthHeights();
        saveGrowthWeights();
        saveGrowthCircumferences();
        saveInfos();
    }

    private void saveEssentials() throws IOException {
        List<String[]> datas = csvDataLoader.loadData("db/essentialInitData.csv");
        List<Essential> essentials = new ArrayList<>();

        for (String[] data : datas) {
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

    private void saveGrowthHeights() throws IOException {
        List<String[]> datas = csvDataLoader.loadData("db/growthHeightInitData.csv");
        List<GrowthHeight> heights = new ArrayList<>();

        for (String[] data : datas) {
            List<String> heightData = new ArrayList<>(Arrays.asList(data).subList(2, data.length));
            GrowthHeight growthHeight = GrowthHeight.builder()
                    .gender(Integer.parseInt(data[0]))
                    .month(Integer.parseInt(data[1]))
                    .heights(Arrays.stream(data, 2, data.length).map(Float::parseFloat).collect(Collectors.toList()))
                    .build();
            heights.add(growthHeight);
        }

        growthHeightRepository.saveAll(heights);
    }

    private void saveGrowthWeights() throws IOException {
        List<String[]> datas = csvDataLoader.loadData("db/growthWeightInitData.csv");
        List<GrowthWeight> weights = new ArrayList<>();

        for (String[] data : datas) {
            List<String> weightData = new ArrayList<>(Arrays.asList(data).subList(2, data.length));
            GrowthWeight growthWeight = GrowthWeight.builder()
                    .gender(Integer.parseInt(data[0]))
                    .month(Integer.parseInt(data[1]))
                    .weights(Arrays.stream(data, 2, data.length).map(Float::parseFloat).collect(Collectors.toList()))
                    .build();
            weights.add(growthWeight);
        }

        growthWeightRepository.saveAll(weights);
    }

    private void saveGrowthCircumferences() throws IOException {
        List<String[]> datas = csvDataLoader.loadData("db/growthCircumferenceInitData.csv");
        List<GrowthCircumference> circumferences = new ArrayList<>();

        for (String[] data : datas) {
            List<String> circumferencesData = new ArrayList<>(Arrays.asList(data).subList(2, data.length));
            GrowthCircumference growthCircumference = GrowthCircumference.builder()
                    .gender(Integer.parseInt(data[0]))
                    .month(Integer.parseInt(data[1]))
                    .circumferences(Arrays.stream(data, 2, data.length).map(Float::parseFloat).collect(Collectors.toList()))
                    .build();
            circumferences.add(growthCircumference);
        }

        growthCircumferenceRepository.saveAll(circumferences);
    }

    private void saveInfos() throws IOException {
        List<String[]> datas = csvDataLoader.loadData("db/infoInitData.csv");
        List<Info> infos = new ArrayList<>();
        for (String[] data : datas) {
            Info info = Info.builder()
                    .content(data[0])
                    .startTime(data[1])
                    .endTime(data[2])
                    .target(data[3])
                    .category(data[4].charAt(0))
                    .build();
            infos.add(info);
        }
        
        infoRepository.saveAll(infos);
    }
}
