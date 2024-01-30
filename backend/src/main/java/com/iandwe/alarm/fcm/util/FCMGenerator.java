package com.iandwe.alarm.fcm.util;
import static com.iandwe.alarm.fcm.constant.FCMMessage.*;

public class FCMGenerator {

    public static String getTitleMessage(String name, String essentialName) {
        return name + FCM_TITLE_MESSAGE + essentialName + FCM_ESSENTIAL_MESSAGE;
    }

    public static String getBodyMessage(){
        return FCM_BODY_MESSAGE;
    }
}
