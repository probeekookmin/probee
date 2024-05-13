package com.capstone.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.capstone.server.dto.ChatGPTRequest;
import com.capstone.server.dto.ChatGPTResponse;

@Service
public class ChatGPTService {
    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiURL;

    @Autowired
    private RestTemplate template;

    // TODO : 파라미터 추가
    // 현재는 예시 데이터 넣은 상태. 파라미터 수정 후 아래 함수만 갖다쓰면 됨.
    public String translateEnglishToKorean() {
        String text = this.createUserText("man", "short hair", "blue", "short sleeve shirt", "blue", "a pair of black long pants", "backpack");
        ChatGPTRequest request = new ChatGPTRequest(model, text, "user");
        request.setPresencePenalty(0.9);
        request.addMessages(this.createSystemPrompt(), "system");
        ChatGPTResponse chatGPTResponse = template.postForObject(apiURL, request, ChatGPTResponse.class);
        return chatGPTResponse.getChoices().get(0).getMessage().getContent();
    }

    public String createUserText(String genderAndAge, String hair, String topColor, String topType,
                              String bottomColor, String bottomType, String bag) {
        genderAndAge = genderAndAge.toLowerCase();
        String gender;
        if (genderAndAge.equals("man") || genderAndAge.equals("boy")) {
            gender = "He";
        } else {
            gender = "She";
        }
        String query = "A " + genderAndAge + " wearing a " + topColor + " " + topType + " and a " +
                bottomColor + " " + bottomType + ". ";

        // 손에 드는 건 carrying이 미세하게 더 나은 결과를 보임 (holding ↔ carrying)
        if (bag.equals("backpack")) {
            query += gender + " has " + hair + ". " + gender + " is carrying a " + bag + ".";
        } else if (bag.equals("bag")) {
            query += gender + " has " + hair + ". " + gender + " is holding a " + bag + ".";
        } else {
            query += gender + " has " + hair + ".";
        }
        return query.replace("_", " ");
    }

    public String createSystemPrompt() {
        String prompt = """
                You are a translator.
                I will provide you with the information of the character's description in English, so please translate this information into Korean correctly.

                An example is as follows.

                Case 1.
                Input sentence: A woman wearing a blue long sleeve shirt and a pair of white short pants. She has long hair. He is holding a bag.
                Desired Translation: 긴 머리. 파란색 긴팔 셔츠와 흰 반바지를 입고, 가방을 들고 있음.

                Case 2.
                Input sentence: A boy wearing a black long sleeve shirt and a pair of black long pants. He has long hair.
                Desired Translation: 긴 머리. 검정 긴팔 셔츠와 검정 긴 바지를 입고 있음.

                Case 3.
                Input sentence: A girl wearing a red long sleeve shirt and a white skirt. She has short hair. She is carrying a backpack.
                Desired Translation: 짧은 머리. 빨간 긴팔 셔츠와 흰 치마를 입고, 가방을 메고 있음.

                Case 4.
                Input sentence: A man wearing a orange short sleeve shirt and a pair of blue long pants. He has short hair. He is carrying a backpack.
                Desired Translation: 짧은 머리. 주황색 반팔 셔츠와 파란색 긴 바지를 입고, 가방을 메고 있음.

                Case 5.
                Input sentence: A girl wearing a purple short sleeve shirt and a pair of pink short pants. He has short hair. He is holding a backpack.
                Desired Translation: 짧은 머리. 보라색 반팔 셔츠와 핑크색 반바지를 입고, 가방을 들고 있음.

                Please respond to every sentence simply.
                """;
        return prompt;
    }

}
