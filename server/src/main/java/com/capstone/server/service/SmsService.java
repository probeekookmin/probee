package com.capstone.server.service;

import com.capstone.server.code.ErrorCode;
import com.capstone.server.dto.shortUrl.ShortUrlResponseDto;
import com.capstone.server.exception.CustomException;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class SmsService {
    @Value("${sms.key}")
    String smsApiKey;
    @Value("${sms.secret}")
    String smsApiSecret;
    @Value("${phone_num}")
    String phoneNum;

    @Value("${backend.server.url}")
    String serverUrl;
    @Value("${naver.api.client.id}")
    String naverClientKey;
    @Value("${naver.api.client.secret}")
    String naverClientSecret;
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private EncryptionService encryptionService;

    final String naverOpenApiUrl = "https://openapi.naver.com/v1/util/shorturl";
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
        try {
            String token = encryptionService.encryptToken(id.toString());
            String longUrl = UriComponentsBuilder.fromHttpUrl("http://www.naver.com")
                    .path("/api/guardian/validate-token")
                    .queryParam("token", token)
                    .toUriString();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            headers.set("X-Naver-Client-Id", naverClientKey);
            headers.set("X-Naver-Client-Secret", naverClientSecret);

            MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
            map.add("url", longUrl);

            HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, headers);
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<ShortUrlResponseDto> response = restTemplate.postForEntity(naverOpenApiUrl, entity, ShortUrlResponseDto.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody().getResult().getUrl();
            } else {
                throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, "Failed to shorten URL", "url shorter fail");
            }
        } catch (Exception e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }

    private void setMessageService() {
        messageService = NurigoApp.INSTANCE.initialize(smsApiKey, smsApiSecret, "https://api.solapi.com");
    }
}



