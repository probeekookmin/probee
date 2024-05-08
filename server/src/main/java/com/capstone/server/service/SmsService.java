package com.capstone.server.service;

import com.capstone.server.code.ErrorCode;
import com.capstone.server.dto.shortUrl.ShortUrlRequestDto;
import com.capstone.server.dto.shortUrl.ShortUrlResponseDto;
import com.capstone.server.exception.CustomException;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SmsService {
    @Value("${sms.key}")
    String smsApiKey;
    @Value("${sms.secret}")
    String smsApiSecret;
    @Value("${phone_num}")
    String phoneNum;

    @Value("${mobile.server.url}")
    String serverUrl;
    @Value("${bitly.api.token}")
    String bitlyApiKey;
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private EncryptionService encryptionService;

    final String bitlyUrl = "https://api-ssl.bitly.com/v4/shorten";
    DefaultMessageService messageService;

    //문자메시지 발송
    public void sendRegistrationMessage(String guardianPhoneNumber, String name, Long id) {
        if (messageService == null) {
            this.setMessageService();
        }
        Message message = new Message();
        message.setFrom(phoneNum);
        message.setTo(guardianPhoneNumber);
        message.setText(String.format("[probee]\n%s님의 탐색이 시작되었습니다.\n%s", name, getShortUrl(id)));
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

    public String getShortUrl(Long id) {
        String longUrl = serverUrl + "/api/guardian/validate-token/" + encryptionService.encryptToken(id.toString());
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", bitlyApiKey);
        HttpEntity<ShortUrlRequestDto> entity = new HttpEntity<>(new ShortUrlRequestDto(longUrl), headers);
        ShortUrlResponseDto shortUrlResponseDto;
        try {
            shortUrlResponseDto = restTemplate.postForObject(bitlyUrl, entity, ShortUrlResponseDto.class);
            return shortUrlResponseDto.getId();
        } catch (Exception e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, "url생성오류", "단축 url생성 실패");
        }
    }

    private void setMessageService() {
        messageService = NurigoApp.INSTANCE.initialize(smsApiKey, smsApiSecret, "https://api.solapi.com");
    }
}
