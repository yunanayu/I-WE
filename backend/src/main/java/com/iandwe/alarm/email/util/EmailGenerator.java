package com.iandwe.alarm.email.util;

import com.iandwe.alarm.email.constant.EmailMessage;

public class EmailGenerator {

    public static String generateSubject(String memberName) {
        return memberName + EmailMessage.EMAIL_START_MESSAGE;
    }

    public static String generateText(String name, String category) {
        StringBuilder text = new StringBuilder();
        text.append(name).append(category).append(EmailMessage.EMAIL_PERIOD);
        text.append(EmailMessage.EMAIL_LAST_MESSAGE);

        return text.toString();
    }
}
