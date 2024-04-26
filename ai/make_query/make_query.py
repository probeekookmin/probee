import openai
from dotenv import load_dotenv
import os

load_dotenv()
print(os.getenv("OPENAI_API_KEY"))
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")  # openAI-API 키를 넣으세요
openai.api_key = OPENAI_API_KEY
async def create_query(gender_and_age, hair, top_color, top_type, bottom_color, bottom_type, bag):
    if gender_and_age == "man" or gender_and_age == "boy":
        gender = "He"
    else:   
        gender = "She"
    query = f"A {gender_and_age} wearing a {top_color} {top_type} and a {bottom_color} {bottom_type}. "
    
    # 손에 드는 건 carrying이 미세하게 더 나은 결과를 보임 (holding ↔ carrying)
    if bag == "backpack":
        query += f"{gender} has {hair}. {gender} is carrying a {bag}."
    elif bag == "bag":
        query += f"{gender} has {hair}. {gender} is holding a {bag}."
    else:
        query += f"{gender} has {hair}."
    return query




async def translate_english_to_korean(text):
    response = openai.chat.completions.create(
    model = "gpt-3.5-turbo",
    presence_penalty = 0.9,
    messages = [
            {"role": "system", "content": """
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
            """},
            {"role": "user", "content": text},
    ]
    )

    return response.choices[0].message.content

