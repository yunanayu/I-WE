package com.iandwe.cheat.service;

import com.iandwe.alarm.email.dto.EmailDto;
import com.iandwe.alarm.fcm.dto.FCMDto;
import com.iandwe.alarm.fcm.util.FCMSender;
import com.iandwe.cheat.dto.request.CheatRequestDto;
import com.iandwe.member.exception.NoMemberExistException;
import com.iandwe.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CheatService {

    private final MemberRepository memberRepository;

    private final JavaMailSender emailSender;

    private final FCMSender fcmSender;

    public void cheatFCM(CheatRequestDto cheatRequestDto) {
        String fcmToken = memberRepository.findByNum(cheatRequestDto.getNum())
                .orElseThrow(NoMemberExistException::new)
                .getFcmToken();

        sendFCM(FCMDto.ofCheatRequestDto(cheatRequestDto, fcmToken));
    }

    public void cheatEmail(CheatRequestDto cheatRequestDto) {
        String email = memberRepository.findByNum(cheatRequestDto.getNum())
                .orElseThrow(NoMemberExistException::new)
                .getEmail();

        sendEmail(EmailDto.ofCheatRequestDto(cheatRequestDto, email));
    }

    private void sendEmail(EmailDto mailDto) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("0833eovy@gmail.com");
        message.setTo(mailDto.getEmail());
        message.setSubject(mailDto.getSubject());
        message.setText(mailDto.getText());
        emailSender.send(message);
    }

    private void sendFCM(FCMDto fcmDto) {
        fcmSender.sendFCM(fcmDto);
    }
}
