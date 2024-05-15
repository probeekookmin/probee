package com.capstone.server.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.capstone.server.dto.ChatGPTRequest;
import com.capstone.server.dto.ChatGPTResponse;
import com.capstone.server.dto.MissingPeopleCreateRequestDto;
import com.capstone.server.model.enums.BagType;
import com.capstone.server.model.enums.BottomType;
import com.capstone.server.model.enums.Color;
import com.capstone.server.model.enums.Gender;
import com.capstone.server.model.enums.HairStyle;
import com.capstone.server.model.enums.TopType;

@Service
public class ChatGPTService {
    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiURL;

    @Autowired
    private RestTemplate template;

    // TODO : 파라미터 추가
    // 아래 함수 사용
    public MissingPeopleCreateRequestDto translateEnglishToKorean(MissingPeopleCreateRequestDto missingPeopleCreateRequestDto) {
        
        String text = this.createUserText(missingPeopleCreateRequestDto.getAgeWhenMissing(),
                                        Gender.fromKor(missingPeopleCreateRequestDto.getGender()).getValue(),
                                        HairStyle.fromKor(missingPeopleCreateRequestDto.getHairStyle()).getValue(),
                                        Color.fromKor(missingPeopleCreateRequestDto.getTopColor()).getValue(),
                                        TopType.fromKor(missingPeopleCreateRequestDto.getTopType()).getValue(),
                                        Color.fromKor(missingPeopleCreateRequestDto.getBottomColor()).getValue(),
                                        BottomType.fromKor(missingPeopleCreateRequestDto.getBottomType()).getValue(),
                                        BagType.fromKor(missingPeopleCreateRequestDto.getBagType()).getValue());

        ChatGPTRequest request = new ChatGPTRequest(model, text, "user");
        request.setPresencePenalty(0.9);
        request.setTemperature(0.3);
        request.setFrequencyPenalty(-1);
        request.addMessages(this.createSystemPrompt(), "system");

        ChatGPTResponse chatGPTResponse = template.postForObject(apiURL, request, ChatGPTResponse.class);
        missingPeopleCreateRequestDto.setQuery(text);
        missingPeopleCreateRequestDto.setKo_query(chatGPTResponse.getChoices().get(0).getMessage().getContent());

        return missingPeopleCreateRequestDto; 
    }

    // ex) A boy has long hair. He wearing a red short sleeve and a blue a short pants. He is carrying a backpack.
    public String createUserText(Integer age, String genderExceptAge, String hair, String topColor, String topType,
                              String bottomColor, String bottomType, String bag) {
        genderExceptAge = genderExceptAge.toLowerCase();
        String gender;
        String genderIncludeAge;
        String query;

        // 성별 설정
        if (genderExceptAge.equals("man")) {
            gender = "He";
            if (age < 15) {
                genderIncludeAge = "A man";
            } else {
                genderIncludeAge = "A boy";
            }
        } else {
            gender = "She";
            if (age < 15) {
                genderIncludeAge = "A woman";
            } else {
                genderIncludeAge = "A girl";
            }
        }

        // 머리 스타일 정보 추가 
        query = String.format("%s has %s. ", genderIncludeAge, hair);

        // 인상착의 정보 확인
        if (topType.equals("none") && bottomType.equals("none")) {
            throw new IllegalArgumentException("인상착의 정보가 존재하지 않습니다.");
        }

        // 상하의 색상 정보 없는 경우
        else if (topColor.equals("none") && bottomColor.equals("none")) {
            query += String.format("%s wearing a %s and a %s. ",
                                gender, topType, bottomType.equals("skirt") ? bottomType : "a " + bottomType);
        }

        // 상하의 정보 중 단 하나를 알고 있으며, 색상 정보를 제외하고 종류만 알고 있는 경우
        else if (topColor.equals("none") && bottomType.equals("none")) {
            query += String.format("%s wearing a %s. ", gender, topType);
        } else if (bottomColor.equals("none") && topType.equals("none")) {
            query += String.format("%s wearing %s. ", gender, bottomType.equals("skirt") ? bottomType : "a " + bottomType);
        }

        // 상하의 정보 중 하나의 색상 정보만 누락된 경우
        else if (topColor.equals("none")) {
            query += String.format("%s wearing a %s %s and %s %s. ",
                                gender, bottomColor, bottomType, gender, bag.equals("backpack") ? "is carrying" : "is holding a " + bag);
        } else if (bottomColor.equals("none")) {
            query += String.format("%s wearing a %s %s and %s %s. ",
                                gender, topColor, topType, gender, bag.equals("backpack") ? "is carrying" : "is holding a " + bag);
        }

        // 상하의 정보 중 하나의 종류 정보가 누락된 경우
        else if (topType.equals("none")) {
            query += String.format("%s wearing %s %s. ", gender, bottomColor, bottomType);
        } else if (bottomType.equals("none")) {
            query += String.format("%s wearing %s %s. ", gender, topColor, topType);
        }

        // 모든 정보가 포함된 경우
        else {
            query += String.format("%s wearing a %s %s and a %s %s. ",
                                gender, topColor, topType, bottomColor, bottomType.equals("skirt") ? bottomType : "a " + bottomType);
        }

        // 가방 정보 추가
        if (bag.equals("backpack")) {
            query += String.format("%s is carrying a %s.", gender, bag);
        } else if (bag.equals("bag")) {
            query += String.format("%s is holding a %s.", gender, bag);
        } 

        
        return query.replace("_", " ");
    }

    public String createSystemPrompt() {
        String prompt = """
            You are a translator.
            I will provide you with the information of the character's description in English, so please translate this information into Korean correctly.

            Please follow the following rules when translating into Korean.

            1. Please translate 'short sleeved shirt' into '반팔' and 'long sleeved shirt' into '긴팔'.
            2. Please translate ‘red’ into ‘빨간색’, ‘orange’ into ‘주황색’, ‘yellow’ into ‘노란색’, ‘green’ into ‘초록색’, ‘khaki' into '카키색', 'light blue' into '하늘색', ‘blue’ into ‘파란색’, ‘dark blue' into '남색', ‘purple’ into ‘보라색’, ‘pink' into '분홍색', 'maroon' into '자주색', ‘white’ into ‘흰색’, ‘beige' into '베이지색’, ‘black’ into ‘검은색’
            3. Please translate 'backpack' into '백팩', 'bag' into '가방'

            An example is as follows.

            Case 1.
            Input sentence: A woman has long hair. She wearing a blue long sleeve shirt and white short pants. She is holding a bag.
            Desired Translation: 긴 머리. 파란색 긴팔과 흰색 반바지를 입고, 가방을 들고 있음.

            Case 2.
            Input sentence: A boy has long hair. He wearing a maroon long sleeve shirt and black long pants. 
            Desired Translation: 긴 머리. 자주색 긴팔과 검정색 긴 바지를 입고 있음.

            Case 3.
            Input sentence: A girl has short hair. She wearing a red long sleeve shirt and a dark blue skirt. She is carrying a backpack.
            Desired Translation: 짧은 머리. 빨간색 긴팔과 남색 치마를 입고, 가방을 메고 있음.

            Case 4.
            Input sentence: A man has short hair. He wearing a orange winter coat and blue long pants. He is carrying a backpack.
            Desired Translation: 짧은 머리. 주황색 패딩과 파란색 긴 바지를 입고, 가방을 메고 있음.

            Case 5.
            Input sentence: A girl has short hair. She wearing a purple short sleeve shirt and pink short pants. She is holding a backpack.
            Desired Translation: 짧은 머리. 보라색 반팔과 분홍색 반바지를 입고, 가방을 들고 있음.

            Case 6.
            Input sentence: A man has short hair. He wearing a coat and long pants.
            Desired Translation: 짧은 머리. 코트와 긴 바지를 입고 있음.

            Case 7.
            Input sentence: A boy has long hair. He wearing a winter coat. He is carrying a backpack.
            Desired Translation: 긴 머리. 패딩을 입고, 가방을 메고 있음.

            Case 8.
            Input sentence: A woman has short hair. She wearing a skirt. She is holding a backpack.
            Desired Translation: 짧은 머리. 치마를 입고, 가방을 들고 있음.

            Case 9.
            Input sentence: A man has long hair. He wearing a coat and khaki short pants. 
            Desired Translation: 긴 머리. 코트와 카키색 반바지를 입고 있음.

            Case 10.
            Input sentence: A girl has short hair. She wearing a light blue winter coat and a skirt.
            Desired Translation: 짧은 머리. 하늘색 패딩과 치마를 입고 있음.

            Case 11.
            Input sentence: A boy has short hair. He wearing dark blue short pants.
            Desired Translation: 짧은 머리. 남색 반바지를 입고 있음.

            Case 12.
            Input sentence: A woman has short hair. She wearing a beige coat. She is holding a backpack."
            Desired Translation: 짧은 머리. 베이지색 코트를 입고, 가방을 들고 있음.

            Please respond to every sentence simply, 
            and Please accurately translate the example sentences and format written in Desired Translation.
            
            """;
        return prompt;
    }

}
