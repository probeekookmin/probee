package com.capstone.server.service;

import com.capstone.server.code.ErrorCode;
import com.capstone.server.exception.CustomException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;

@Service
public class EncryptionService {
    @Value("${guardianEncryptKey}")
    private String SECRET_KEY;

    //토큰 암호화
    public String encryptToken(String token) {
        try {
            Key key = new SecretKeySpec(SECRET_KEY.getBytes(), "AES");
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.ENCRYPT_MODE, key);
            byte[] encryptedBytes = cipher.doFinal(token.getBytes());
            return Base64.getUrlEncoder().encodeToString(encryptedBytes);
        } catch (Exception e) {
            System.out.println(e);
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }

    //토큰 복호화
    public String decryptToken(String encryptedToken) {
        try {
            Key key = new SecretKeySpec(SECRET_KEY.getBytes(), "AES");
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.DECRYPT_MODE, key);
            byte[] decodedBytes = Base64.getUrlDecoder().decode(encryptedToken);
            byte[] decryptedBytes = cipher.doFinal(decodedBytes);
            return new String(decryptedBytes);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }

    public Long extractIdFromToken(String token) {
        String decryptedToken = decryptToken(token);
        return Long.valueOf(decryptedToken);
    }
}
