package com.capstone.server.service;

import com.capstone.server.code.ErrorCode;
import com.capstone.server.exception.CustomException;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsService {
    @Value("${sms.key}")
    String apiKey;
    @Value("${sms.secret}")
    String apiSecret;
    @Value("${phone_num}")
    String phoneNum;
    DefaultMessageService messageService;

    //문자메시지 발송
    public void sendRegistrationMessage(String guardianPhoneNumber, String name) {
        if (messageService == null) {
            this.setMessageService();
        }
        Message message = new Message();
        message.setFrom(phoneNum);
        message.setTo(guardianPhoneNumber);
        message.setText(String.format("[probee]\n%s님의 탐색이 시작되었습니다\nhttps://probee.co.kr", name));
        try {
            messageService.send(message);
        } catch (NurigoMessageNotReceivedException exception) {
            System.out.println(exception.getMessage());
            System.out.println(exception.getFailedMessageList());
            throw new CustomException(ErrorCode.MESSAGE_SEND_ERROR, exception);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }

    private void setMessageService() {
        messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.solapi.com");
    }
}
