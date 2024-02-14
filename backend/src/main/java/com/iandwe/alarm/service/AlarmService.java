package com.iandwe.alarm.service;

import com.iandwe.alarm.email.dto.EmailDto;
import com.iandwe.alarm.fcm.dto.FCMDto;
import com.iandwe.alarm.fcm.util.FCMSender;
import com.iandwe.baby.domain.Baby;
import com.iandwe.baby.exception.NoBabyExistException;
import com.iandwe.baby.repository.BabyRepository;
import com.iandwe.checker.domain.BabyChecker;
import com.iandwe.checker.domain.MotherChecker;
import com.iandwe.essential.domain.Essential;
import com.iandwe.essential.exception.NoEssentialExistException;
import com.iandwe.essential.repository.EssentialRepository;
import com.iandwe.member.domain.Member;
import com.iandwe.member.exception.NoMemberExistException;
import com.iandwe.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AlarmService {

    private final BabyRepository babyRepository;

    private final MemberRepository memberRepository;

    private final EssentialRepository essentialRepository;

    private final JavaMailSender emailSender;

    private final FCMSender fcmSender;

    public void sendBabyAlarm(BabyChecker babyChecker) {
        Essential essential = essentialRepository.findByNum(babyChecker.getEssentialNum()).orElseThrow(NoEssentialExistException::new);
        Baby baby = babyRepository.findByNum(babyChecker.getBabyNum()).orElseThrow(NoBabyExistException::new);
        Member mother = memberRepository.findByNum(baby.getMotherNum()).orElseThrow(NoMemberExistException::new);
        if (essential.isRange(baby.getTargetTime())) {
            sendEmail(EmailDto.of(mother, essential));
            sendFCM(FCMDto.of(mother, essential, "main")); // 필요정보 : token, title, content
        }
    }

    public void sendMotherAlarm(MotherChecker motherChecker) {
        Essential essential = essentialRepository.findByNum(motherChecker.getEssentialNum()).orElseThrow(NoEssentialExistException::new);
        Member mother = memberRepository.findByNum(motherChecker.getMotherNum()).orElseThrow(NoMemberExistException::new);
        Baby baby = babyRepository.findByNum(motherChecker.getBabyNum()).orElseThrow(NoBabyExistException::new);

        if (essential.isRange(baby.getTargetTime())) {
            sendEmail(EmailDto.of(mother, essential));
            sendFCM(FCMDto.of(mother, essential, "main")); // 필요정보 : token, title, content
        }
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
