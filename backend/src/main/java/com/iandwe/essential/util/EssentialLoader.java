package com.iandwe.essential.util;

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
public class EssentialLoader {
    private String filePath;
    private BufferedReader bufferedReader;
    private List<String[]> commerces;
    private int index;

    public EssentialLoader() {
        try{
            this.filePath = "src/main/resources/db/essentialInitData.csv";
            bufferedReader = new BufferedReader(new InputStreamReader(new FileInputStream(this.filePath), "UTF-8"));
            commerces = new ArrayList<>();

            makeList(bufferedReader);
            this.index = 0;
        } catch(IOException e){
            e.printStackTrace();
        }
    }

    public List<String[]> loadEssentialDatas(){
        return commerces;
    }

    private void makeList(BufferedReader bufferedReader) throws IOException {
        String line = null;
        while ((line = bufferedReader.readLine()) != null) {
            String[] lineContents = line.split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)", -1);

            commerces.add(lineContents);
        }
    }

}
