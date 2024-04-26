from fastapi import FastAPI
from fastapi.responses import JSONResponse, FileResponse
from pydantic import BaseModel
import sys
import os
import json
from pathlib import Path
from dotenv import load_dotenv
import os
import boto3


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

s3_client = boto3.client('s3')
bucket_name = "spring-server-image-storage"

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
    missingPeopleId : int
    MissingPeopleCreateRequestDto : MissingPeopleCreateRequestDto #dto에서 필요한 정보를 받아, 쿼리 생성 예정



class TextResult(BaseModel):
    query : str
    ko_query : str
    data : list

@app.post('/run', response_model=TextResult)
async def run(input: TotalInput):
    await runYolo(input)
    query = await make_query(input.MissingPeopleCreateRequestDto) #한글쿼리,영어쿼리 생성
    result_dir = await runTextReID(input, query["en_query"]) 
    result_json_dir = await uploadS3(result_dir,input.missingPeopleId, input.searchId, input.cctvId)
    with open(result_json_dir, 'r') as file:
        result = json.load(file)
    
    return TextResult(query = query["en_query"], ko_query = query["ko_query"], data = result[1:])

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
    
    
    return result_dir


async def uploadS3(json_file_path:str, missingPeopleId:int, searchId:int, cctvId:str):
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
        new_file_name = f"{os.path.basename(img_path).split('.')[0]}_{cctvId}_{similarity}{os.path.splitext(img_path)[-1]}"
        new_file_name = new_file_name.replace(' ', '-').replace(':', '').replace('/', '+')
        s3_key = f"missingPeopleId={missingPeopleId}/result/{searchId}/{new_file_name}"
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

        except Exception as e:
            errors.append(f"Error uploading {img_path}: {str(e)}")
    
    if errors:
        return JSONResponse(status_code=500, content={"message": "Errors occurred during upload", "errors": errors})
    
    # 업데이트된 JSON 데이터를 파일로 저장
    updated_json_path = os.path.dirname(json_file_path) + 'updated_data.json'
    with open(updated_json_path, 'w') as f:
        json.dump(data, f, indent=4)

    return updated_json_path

