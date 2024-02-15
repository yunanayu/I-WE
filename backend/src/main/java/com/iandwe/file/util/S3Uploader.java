package com.iandwe.file.util;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.iandwe.record.domain.BabyRecord;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class S3Uploader {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.prefix}")
    private String prefix;

    public List<String> storeImages(String domain, List<MultipartFile> files) {
        List<String> images = new ArrayList<>();
        try {// db 에 넣어줄 stirng list, mullable

            for (MultipartFile file : files) {
                String fileName = domain + "/" + S3UUIDGenerator.generateUUID(); // url 뒤에 붙을 s3에 저장될 위치, record 폴더에 저장되도록
                ObjectMetadata metadata = new ObjectMetadata();
                metadata.setContentType(file.getContentType());
                metadata.setContentLength(file.getSize());
                amazonS3Client.putObject(bucket, fileName, file.getInputStream(), metadata);

                // images 에 넣기
                images.add(prefix + fileName);
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        return images;
    }
}
