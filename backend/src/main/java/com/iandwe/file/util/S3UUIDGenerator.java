package com.iandwe.file.util;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class S3UUIDGenerator {
    private static final int TEMP_PW_LENGTH = 8;
    private static final char[] rndAllCharacters = new char[] {
            // number
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            // uppercase
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
            'V', 'W', 'X', 'Y', 'Z',
            // lowercase
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
            'v', 'w', 'x', 'y', 'z' };

    public static String generateUUID() {
        SecureRandom random = new SecureRandom();
        StringBuilder stringBuilder = new StringBuilder();

        int rndAllCharactersLength = rndAllCharacters.length;
        for (int i = 0; i < TEMP_PW_LENGTH; i++) {
            stringBuilder.append(rndAllCharacters[random.nextInt(rndAllCharactersLength)]);
        }

        return stringBuilder.toString();
    }
}
