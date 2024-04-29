from fastapi import FastAPI, BackgroundTasks
from fastapi.responses import JSONResponse, FileResponse
from pydantic import BaseModel
import sys
import os
import json
from pathlib import Path
from dotenv import load_dotenv
import os
import boto3
import datetime
import requests

sys.path.append(str(Path(__file__).parent))
sys.path.append(str(Path(__file__).parent)+"/yolov5_crowdhuman")
sys.path.append(str(Path(__file__).parent)+"/make_query")
sys.path.append(str(Path(__file__).parent)+"/TextReID")

from TextReID.test_net import findByText 
from yolov5_crowdhuman.detect import run_detection
from make_query.make_query import create_query, translate_english_to_korean

app = FastAPI(port = 8080)

load_dotenv()
#s3설정
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
SERVER_URL = os.getenv("SERVER_URL")
s3_client = boto3.client('s3')
bucket_name = "spring-server-image-storage"

class ClothesInfo(BaseModel):
    gender : str
    hairStyle : str
    topColor:str
    topType:str
    bottomColor:str
    bottomType:str
    bagType:str
    # shoesColor:str

class TotalInput(BaseModel):
    cctvId : str
    startTime : str
    endTime : str
    searchId: int
    missingPeopleId : int
    step : str
    query : str|None
    clothesInfo : ClothesInfo
    


class DetectResult(BaseModel):
    searchId : int
    missingPeopleId : int
    query : str
    koQuery : str | None
    data : list
    

class CallResult(BaseModel):
    code : int
    message : str

#테스트용    
@app.post('/test', response_model=DetectResult)
async def test(input: TotalInput):
    print(input)
    query, result_json_dir = await logic(input)
    with open(result_json_dir, 'r') as file:
        result = json.load(file)
    
    return DetectResult(query = query["en_query"], ko_query = query["ko_query"], data = result[1:])

@app.post('/run', response_model=CallResult)
async def run(input: TotalInput, background_tasks: BackgroundTasks):
    background_tasks.add_task(detect, input)
    return {"code" : 200, "message": "Task started"}

#비동기적 응답을 위해 연산과정 분리
async def detect(input : TotalInput):
    await runYolo(input)
    #이미 영문쿼리가 존재하면 생성안함.
    en_query = input.query
    ko_query = None
    if en_query==None:
        en_query,ko_query = await make_query(input.clothesInfo) #한글쿼리,영어쿼리 생성
    result_dir = await runTextReID(input, en_query) 
    result_json_dir = await uploadS3(result_dir,input.missingPeopleId, input.searchId, input.step)
    with open(result_json_dir, 'r') as file:
        result = json.load(file)
    response = requests.post(SERVER_URL + "/api/missing-people/detect", json = DetectResult(searchId= input.searchId, missingPeopleId= input.missingPeopleId, query = en_query, koQuery = ko_query, data = result[1:]).__dict__)
    print(response.text)

async def logic(input: TotalInput):
    await runYolo(input)
    query = await make_query(input.clothesInfo) #한글쿼리,영어쿼리 생성
    result_dir = await runTextReID(input, query["en_query"]) 
    result_json_dir = await uploadS3(result_dir,input.missingPeopleId, input.searchId, input.step)
    return query,result_json_dir
    
async def make_query(clothesInfo : ClothesInfo):
    en_query = await create_query(clothesInfo.gender, clothesInfo.hairStyle, clothesInfo.topColor, clothesInfo.topType, clothesInfo.bottomColor, clothesInfo.bottomType,  clothesInfo.bagType)
    ko_query = await translate_english_to_korean(en_query)
    return en_query,  ko_query

# todo : 시작시간, 종료시간 지정해서 연산을 돌려야함
async def runYolo(input : TotalInput):
    home_path = os.path.expanduser("~")
    cctv_path = os.path.join(home_path, "Desktop", "cctv", input.cctvId, input.startTime.split("T")[0]) #경로는 각자 환경에 맞게 조장하시오
    return run_detection(weights='crowdhuman_yolov5m.pt', source=cctv_path, name = str(input.searchId),project=home_path+"/Desktop/yolo",cctv_id = input.cctvId) #Result dir을 받아 다음 단계로 넘겨줘야함.

async def runTextReID(input : TotalInput, query : str):
    root_path =  os.getcwd() + "/TextReID"
    print(root_path)
    ## 저장경로 지정
    home_path = os.path.expanduser("~")
    result_dir = os.path.join(home_path, "Desktop", "result", str(input.searchId) ,"output.json")
    findByText(root_path, search_num=input.searchId, query = query, data_dir = os.path.expanduser("~")+"/Desktop/yolo/"+str(input.searchId), save_folder = result_dir)
    
    
    return result_dir


async def uploadS3(json_file_path:str, missingPeopleId:int, searchId:int, step:str):
    try:
        with open(json_file_path, 'r') as file:
            data = json.load(file)
    except:
        return False
    
    # 이미지 파일을 S3에 업로드하고 URL 업데이트
    errors = []
    # 리스트의 첫 번째 요소는 무시하고 나머지에서 작업 수행
    for item in data[1:]:
        img_path = item['img_path']
        similarity = item['Similarity']
        new_file_name = f"{os.path.basename(img_path).split('.')[0]}_{similarity}{os.path.splitext(img_path)[-1]}"
        new_file_name = new_file_name.replace(' ', '-').replace(':', '').replace('/', '+')
        s3_key = f"missingPeopleId={missingPeopleId}/searchHistoryId={searchId}/setp={step}/{new_file_name}"
        try:
            with open(img_path, 'rb') as img_file:
                s3_client.upload_fileobj(
                    Fileobj=img_file,
                    Bucket=bucket_name,
                    Key=s3_key,
                    ExtraArgs={
                    'ACL': 'public-read'  # 공개적으로 읽을 수 있도록 권한 설정
            }
                )
            item['img_path'] = f"https://{bucket_name}.s3.amazonaws.com/{s3_key}"
            item['cctvId'] = 1 #new_file_name.split('_')[0]

        except Exception as e:
            errors.append(f"Error uploading {img_path}: {str(e)}")
    
    if errors:
        return JSONResponse(status_code=500, content={"message": "Errors occurred during upload", "errors": errors})
    
    # 업데이트된 JSON 데이터를 파일로 저장
    updated_json_path = os.path.dirname(json_file_path) + 'updated_data.json'
    with open(updated_json_path, 'w') as f:
        json.dump(data, f, indent=4)

    return updated_json_path

