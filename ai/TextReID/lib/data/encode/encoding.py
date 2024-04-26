import json
import re
import os


word_dict = {} # word (str) : encode (int)
max_onehot = -1 # 없는 단어를 새로 딕셔너리에 추가할 때 필요


def load_word_dict(file_path):
    global word_dict
    global max_onehot

    if os.path.exists(file_path):
        with open(file_path, "r") as file:
            data = json.load(file)
            word_dict = data["word_dict"]
            max_onehot = data["max_onehot"]
    else:
        print(word_dict, max_onehot)
        word_dict_path = os.path.dirname(os.path.abspath(__file__))+"/word_dict/test.json"
        update_word_dict(word_dict_path)
    
    
def save_word_dict(file_path):
    global word_dict
    global max_onehot

    data = {"word_dict": word_dict, "max_onehot": max_onehot}

    with open(file_path, "w") as file:
        json.dump(data, file)
        
        
def update_word_dict(file_path):
    global word_dict
    global max_onehot
    
    with open(file_path, "r") as file:
        data = json.load(file)
        
    for i in range(len(data["annotations"])):
        words = re.sub(r'[^a-zA-Z0-9\s]', '', data["annotations"][i]["sentence"])
        words = words.split()
        for word, onehot in zip(words, data["annotations"][i]["onehot"]):
            if onehot > max_onehot:
                max_onehot = onehot
            if word.lower() not in word_dict.keys():
                word_dict[word.lower()] = onehot

            
def encode(query):
    global word_dict
    global max_onehot

    output = []
    query = re.sub(r'[^a-zA-Z0-9\s]', ' ', query)

    for w in query.split():
        try:
            output.append(word_dict[w.lower()])
        except KeyError:
            print("Key %s not found in the dictionary." % w)
            word_dict[w.lower()] = max_onehot + 1
            output.append(word_dict[w.lower()])
            max_onehot += 1

    return output


def encoder(caption, file_path=os.path.dirname(os.path.abspath(__file__))+"/word_dict/annotations.json"):
    load_word_dict(file_path)
    caption = encode(caption)
    save_word_dict(file_path)

    return caption