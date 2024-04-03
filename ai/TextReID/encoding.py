import json
import re
import random


def encode(query):
    file_path = "./datasets/cuhkpedes/annotations/test.json"
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
            print("Key %s not found in the dictionary."%{e.args[0]})
            """word_dict[max_onehot+1] = e.args[0]
            word_dict[e.args[0]] = max_onehot + 1
            output.append(word_dict[w.lower()])"""
            output.append("None")
            max_onehot += 1

    # print(word_dict)
    return output