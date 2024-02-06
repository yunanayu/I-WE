package com.iandwe.common.util;

import lombok.Getter;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
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

    public List<String[]> loadData(String filePath) {
        try {
            // 클래스패스에서 리소스 로드
            Resource resource = new ClassPathResource(filePath);

            // 리소스를 InputStream으로 얻음
            try (BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(resource.getInputStream(), "UTF-8"))) {
                String line;
                List<String[]> datas = new ArrayList<>();
                while ((line = bufferedReader.readLine()) != null) {
                    String[] lineContents = line.split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)", -1);
                    datas.add(lineContents);
                }
                return datas;
            }
        } catch (IOException e) {
            // 파일 로드 중에 예외 발생 시 처리
            e.printStackTrace();
            // 또는 적절한 방식으로 예외를 처리
            return new ArrayList<>(); // 빈 리스트 반환 또는 예외 상황을 알리는 다른 방법
        }
    }

}

