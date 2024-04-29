package com.capstone.server.service;

import com.capstone.server.dto.SmsRequestDto;
import com.capstone.server.dto.SmsResponseDto;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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
    public void sendRegistrationMessage(String guardianPhoneNumber){
        if (messageService == null) {
            this.setMessageService();
        }
        Message message = new Message();
        message.setFrom(phoneNum);
        message.setTo(guardianPhoneNumber);
        message.setText("[probee]테스트메시지입니다.");
        try{
            messageService.send(message);
        }catch (NurigoMessageNotReceivedException exception){
            System.out.println(exception.getMessage());
            System.out.println(exception.getFailedMessageList());
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
    private void setMessageService(){
        messageService = NurigoApp.INSTANCE.initialize(apiKey,apiSecret,"https://api.solapi.com");
    }
}
