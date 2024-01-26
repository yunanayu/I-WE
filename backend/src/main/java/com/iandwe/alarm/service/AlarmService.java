package com.iandwe.alarm.service;

import com.iandwe.alarm.email.dto.EmailDto;
import com.iandwe.alarm.email.util.EmailGenerator;
import com.iandwe.checker.domain.BabyChecker;
import com.iandwe.essential.dto.EssentialResponseDto;
import com.iandwe.essential.service.EssentialService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AlarmService {

    private final EssentialService essentialService;

    private final JavaMailSender emailSender;

    @Transactional
    public void sendEmailAlarm(BabyChecker babyChecker) {
        EssentialResponseDto essential = essentialService.findByNum(babyChecker.getEssentialNum());
        EmailDto dto = EmailDto.builder()
                .email("306yyy@naver.com") // # TODO BabyChecker -> Member 의 email 가져오기 member.getEmail() + @ + getDomain();
                .title(EmailGenerator.generateSubject("준성"))
                .content(EmailGenerator.generateText(essential.getTitle(), essential.getCategory()))
                .build();
        sendEmail(dto);
    }

    private void sendEmail(EmailDto mailDto) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("0833eovy@gmail.com");
        message.setTo(mailDto.getEmail());
        message.setSubject(mailDto.getTitle());
        message.setText(mailDto.getContent());
        emailSender.send(message);
    }

}
