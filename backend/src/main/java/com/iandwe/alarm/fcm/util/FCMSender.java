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

    public void sendFCM(FCMDto fcmDto){
        Notification notification = Notification.builder()
                .setTitle(fcmDto.getTitle())
                .setBody(fcmDto.getBody())
                .build();

        Message message = Message.builder()
//                .setToken("fNRzu7w-90lOdhbpi9Dmef:APA91bEmnXrJjYXRoRG80KhyizILqUQZ_dge63ZIz-wkNp38scojpmfHiJW8T6izfKnvR0wYa6BU_uNlWYR3AAn9rsf4ngSO4FTWYH9dGIC0HhaPuBVBpOBbRPZ8pvDpjwwKSvhU7yaO")
                .setToken(fcmDto.getFcmToken())
                .setNotification(notification)
                .build();

        try{
            firebaseMessaging.send(message);
        } catch (FirebaseMessagingException e) {
            log.info("FCM ERROR : {}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

}
