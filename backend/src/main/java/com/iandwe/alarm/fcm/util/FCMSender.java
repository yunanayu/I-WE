package com.iandwe.alarm.fcm.util;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.iandwe.alarm.fcm.dto.FCMDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class FCMSender {

    private final FirebaseMessaging firebaseMessaging;

    public void sendFCM(FCMDto fcmDto) {
        Notification notification = Notification.builder()
                .setTitle(fcmDto.getTitle())
                .setBody(fcmDto.getBody())
                .build();

        Message message = Message.builder()
//                .setToken("cgGubJTMjjohJqTNawwrpx:APA91bHXPVI_yrSwy6wZbXq3GxmrFVE5V9WJWUD8z9-YgLQrjMy3U6LFgmdVbIETCmQpM9bSileQdRm8ZYBbnoe_D04Ww_XzJGnhTLdoQUsnWb3NanvJeph_tTfmxEioBTvbiFLss-J6")
                .setToken(fcmDto.getFcmToken())
                .setNotification(notification)
                .putData("key", fcmDto.getKey())
                .build();

        try {
            firebaseMessaging.send(message);
        } catch (FirebaseMessagingException e) {
            log.info("FCM ERROR : {}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

}
