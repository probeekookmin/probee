from fastapi import FastAPI
from pydantic import BaseModel
import sys
import os
import json
from pathlib import Path
from typing import Dict
from starlette.responses import JSONResponse
sys.path.append(str(Path(__file__).parent))
sys.path.append(str(Path(__file__).parent)+"/yolov5_crowdhuman")
sys.path.append(str(Path(__file__).parent)+"/make_query")
sys.path.append(str(Path(__file__).parent)+"/TextReID")
from TextReID.test_net import findByText 
from yolov5_crowdhuman.detect import run_detection
from make_query.make_query import create_query, translate_english_to_korean

app = FastAPI(port = 8080)

class MissingPeopleCreateRequestDto(BaseModel):
    gender_and_age : str
    hairStyle : str
    topColor:str
    topType:str
    bottomColor:str
    bottomType:str
    bagType:str
    # shoesColor:str

class TotalInput(BaseModel):
    cctvId: str
    startTime : str
    endTime : str
    searchId: int
    MissingPeopleCreateRequestDto : MissingPeopleCreateRequestDto #dto에서 필요한 정보를 받아, 쿼리 생성 예정

    def add(self, query: str):
        self.query = query


class TextResult(BaseModel):
    query : str
    ko_query : str
    data : list

@app.post('/run', response_model=TextResult)
async def run(input: TotalInput):
    # temp = await runYolo(input)
    query = await make_query(input.MissingPeopleCreateRequestDto) #한글쿼리,영어쿼리 생성
    result = await runTextReID(input, query["en_query"]) 
    
    return TextResult(query = query["en_query"], ko_query = query["ko_query"], data = result)

# todo : 시작시간, 종료시간 지정해서 연산을 돌려야함
async def runYolo(input : TotalInput):
    home_path = os.path.expanduser("~")
    cctv_path = os.path.join(home_path, "Desktop", "cctv", input.cctvId, input.startTime) #경로는 각자 환경에 맞게 조장하시오
    return run_detection(weights='crowdhuman_yolov5m.pt', source=cctv_path, name = str(input.searchId),project=home_path+"/Desktop/yolo") #Result dir을 받아 다음 단계로 넘겨줘야함.

async def make_query(input : MissingPeopleCreateRequestDto):
    en_query = await create_query(input.gender_and_age, input.hairStyle, input.topColor, input.topType, input.bottomColor, input.bottomType,  input.bagType)
    ko_query = await translate_english_to_korean(en_query)
    return {"en_query" : en_query, "ko_query" : ko_query}

async def runTextReID(input : TotalInput, query : str):
    root_path =  os.getcwd() + "/TextReID"
    print(root_path)
    ## 저장경로 지정
    home_path = os.path.expanduser("~")
    result_dir = os.path.join(home_path, "Desktop", "result", str(input.searchId) ,"output.json")
    findByText(root_path, search_num=input.searchId, query = query, data_dir = os.path.expanduser("~")+"/Desktop/yolo/"+str(input.searchId), save_folder = result_dir)
    with open(result_dir, 'r') as file:
        result = json.load(file)
    
    return result[1:]