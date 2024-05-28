package com.capstone.server.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.capstone.server.code.ErrorCode;
import com.capstone.server.exception.CustomException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtTokenService {

    // JWT Token 발급
    public static String createToken(String loginId, String secretKey, long expireTime) {
        try {
            // Claim = Jwt Token에 들어갈 정보
            // Claim에 loginId를 넣어 줌으로써 나중에 loginId를 꺼낼 수 있음
            Claims claims = Jwts.claims();
            claims.put("loginId", loginId);

            return Jwts.builder()
                    .setClaims(claims)
                    .setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + expireTime))
                    .signWith(SignatureAlgorithm.HS256, secretKey)
                    .compact();
        } catch (Exception e) {
            throw new CustomException(ErrorCode.JWT_CREATE_ERROR);
        }
    }

    // Claims에서 loginId 꺼내기
    public static String getLoginId(String token, String secretKey) {
        return extractClaims(token, secretKey).get("loginId").toString();
    }

    // 발급된 Token이 만료 시간이 지났는지 체크
    public static boolean isExpired(String token, String secretKey) {
        Date expiredDate = extractClaims(token, secretKey).getExpiration();

        // Token의 만료 날짜가 지금보다 이전인지 check
        return expiredDate.before(new Date());
    }

    // SecretKey를 사용해 Token Parsing
    private static Claims extractClaims(String token, String secretKey) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }
}