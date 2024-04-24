from fastapi import FastAPI
from pydantic import BaseModel
import sys
import os
import json
from pathlib import Path
from typing import Dict
from starlette.responses import JSONResponse
print("Aaaa",Path(__file__).parent)
sys.path.append(str(Path(__file__).parent))
sys.path.append(str(Path(__file__).parent)+"/yolov5_crowdhuman")
sys.path.append(str(Path(__file__).parent)+"/TextReID")
from TextReID.test_net import findByText 
from yolov5_crowdhuman.detect import run_detection

app = FastAPI(port = 8080)

class TotalInput(BaseModel):
    cctvId: str
    startTime : str
    endTime : str
    searchId: int
    query : str
#    MissingPeopleCreateRequestDto : MissingPeopleCreateRequestDto #dto에서 필요한 정보를 받아, 쿼리 생성 예정

class MissingPeopleCreateRequestDto(BaseModel):
    hairStyle : str
    topType:str
    topColor:str
    bottomType:str
    bottomColor:str
    bagType:str
    shoesColor:str


class TextResult(BaseModel):
    query : str
    data : list

@app.post('/run', response_model=TextResult)
async def run(input: TotalInput):
    temp = await runYolo(input)
    result = await runTextReID(input)
    
    return result

async def runYolo(input : TotalInput):
    home_path = os.path.expanduser("~")
    cctv_path = os.path.join(home_path, "Desktop", "cctv", input.cctvId, input.startTime) #경로는 각자 환경에 맞게 조장하시오
    return run_detection(weights='crowdhuman_yolov5m.pt', source=cctv_path, name = str(input.searchId),project=home_path+"/Desktop/yolo") #Result dir을 받아 다음 단계로 넘겨줘야함.

async def runTextReID(input : TotalInput):
    root_path =  os.getcwd() + "/TextReID"
    print(root_path)
    ## 저장경로 지정
    home_path = os.path.expanduser("~")
    result_dir = os.path.join(home_path, "Desktop", "result", str(input.searchId) ,"output.json")
    findByText(root_path, search_num=input.searchId, query = input.query, data_dir = os.path.expanduser("~")+"/Desktop/yolo/"+str(input.searchId), save_folder = result_dir)
    with open(result_dir, 'r') as file:
        result = json.load(file)
    
    return TextResult(query=input.query, data=result[1:])


# 파일 내용을 읽어 반환하는 함수 #아직 안씀
def read_file_contents(directory: str) -> Dict[str, str]:
    file_contents = {}
    # 지정된 디렉토리 내의 모든 파일을 순회
    for filename in os.listdir(directory):
        filepath = os.path.join(directory, filename)
        if os.path.isfile(filepath):
            with open(filepath, 'r', encoding='utf-8') as file:
                file_contents[filename] = file.read()
    return file_contents