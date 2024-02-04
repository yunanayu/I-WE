package com.iandwe.common.util;

import lombok.Getter;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Getter
@Component
public class CSVDataLoader {

    public List<String[]> loadData(String filePath) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(new FileInputStream(filePath), "UTF-8"));
        String line = null;
        List<String[]> datas = new ArrayList<>();
        while ((line = bufferedReader.readLine()) != null) {
            String[] lineContents = line.split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)", -1);

            datas.add(lineContents);

        }
        return datas;
    }

}
