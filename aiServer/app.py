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

class YoloInput(BaseModel):
    location: str
    cctvId: str
    startTime : str
    endTime : str
class YoloResult(BaseModel):
    data : str

class TextInput(BaseModel):
    searchId: int
    query : str
class TextResult(BaseModel):
    query : str
    data : list

class TotalInput(BaseModel):
    location: str
    cctvId: str
    startTime : str
    endTime : str
    searchId: int
    query : str

@app.post('/yolo', response_model = YoloResult)
async def run_yolo(input: YoloInput):
    # 사용자의 홈 디렉토리 경로를 가져옵니다.
    home_path = os.path.expanduser("~")
    cctv_path = os.path.join(home_path, "Desktop", "cctv", input.location, input.cctvId, input.searchStart) #경로는 각자 환경에 맞게 조장하시오
    resultDir = run_detection(weights='crowdhuman_yolov5m.pt', source=cctv_path)
    
    with open(resultDir, 'r') as file:
        result = file.read()
    
    return YoloResult(data=result)

@app.post('/text', response_model = TextResult)
async def run_text(input : TextInput):
    root_path = os.getcwd() + "/TextReID"
    result_dir = os.path.expanduser("~")+"/Desktop/result/" +str(input.searchId)+"/output.json"
    findByText(root_path,search_num=input.searchId, query = input.query)
    with open(result_dir, 'r') as file:
        result = json.load(file)
    
    return TextResult(query=input.query, data=result[1:])

@app.post('/run', response_model=TextResult)
async def run(input: TotalInput):
    home_path = os.path.expanduser("~")
    cctv_path = os.path.join(home_path, "Desktop", "cctv", input.location, input.cctvId, input.startTime) #경로는 각자 환경에 맞게 조장하시오
    resultDir = run_detection(weights='crowdhuman_yolov5m.pt', source=cctv_path)

    root_path = os.getcwd() + "/TextReID"
    result_dir = os.path.expanduser("~")+"/Desktop/result/" +str(input.searchId)+"/output.json"
    findByText(root_path,search_num=input.searchId, query = input.query)
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