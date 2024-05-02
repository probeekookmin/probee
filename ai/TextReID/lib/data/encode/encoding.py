import json
import re
import random
import os


def encode(query):
    file_path = os.path.dirname(os.path.abspath(__file__))+"/word_dict/test.json" # 상대경로 수정
    with open(file_path, "r") as file:
        data = json.load(file)

    word_dict = {} # word : encode
    max_onehot = -1

    for i in range(len(data["annotations"])):
        words = re.sub(r'[^a-zA-Z0-9\s]', '', data["annotations"][i]["sentence"])
        words = words.split()
        for word, onehot in zip(words, data["annotations"][i]["onehot"]):
            if onehot > max_onehot:
                max_onehot = onehot
            if word.lower() not in word_dict.keys():
                word_dict[word.lower()] = onehot

    output = []
    query = re.sub(r'[^a-zA-Z0-9\s]', '', query)
    for w in query.split():
        try:
            output.append(word_dict[w.lower()])
        except KeyError as e:
            print("Key %s not found in the dictionary."%{w})
            word_dict[w.lower()] = max_onehot + 1
            output.append(word_dict[w.lower()])
            max_onehot += 1

    # print(word_dict)
    return output