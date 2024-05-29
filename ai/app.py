from fastapi import FastAPI, BackgroundTasks , File, UploadFile
from fastapi.responses import JSONResponse, FileResponse
from pydantic import BaseModel
from typing import List
import sys
import os
import json
from pathlib import Path
from dotenv import load_dotenv
import os
import boto3
import shutil
from datetime import datetime
import requests
from typing import List
import re

sys.path.append(str(Path(__file__).parent))
sys.path.append(str(Path(__file__).parent)+"/yolov5_crowdhuman")
sys.path.append(str(Path(__file__).parent)+"/yolov8")
sys.path.append(str(Path(__file__).parent)+"/TextReID")
sys.path.append(str(Path(__file__).parent)+"/imageSearch")
import shutil
from TextReID.test_net import findByText 
from yolov5_crowdhuman.detect import run_detection
from yolov8.run import run_Yolo
from imageSearch.imgSearch_server import run_Image_to_Image

app = FastAPI(port = 8080)

load_dotenv()
#s3설정
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
SERVER_URL = os.getenv("SERVER_URL")
s3_client = boto3.client('s3')
bucket_name = "spring-server-image-storage"

class CCTVInfo(BaseModel):
    id : int
    longitude : float
    latitude : float

class TotalInput(BaseModel):
    cctvId : List[CCTVInfo]
    startTime : str
    endTime : str
    searchId: int
    missingPeopleId : int
    step : str
    query : str

class DetectResult(BaseModel):
    searchId : int
    missingPeopleId : int
    data : list
    
class SecondInput(BaseModel):
    missingPeopleId : int
    firstSearchId : int
    secondSearchId : int
    topK:int
    queryImagePath : List[str]

class SecondDetectResult(BaseModel):
    data : list
    secondSearchId : int

class FridayInput(BaseModel):
    startTime : str
    endTime : str
    searchId : int
    query: str
    missingPeopleId : int

@app.post('/run1', response_model=DetectResult)
async def firstDetection(input :TotalInput):
    print(input.cctvId)
    yolo_save_path = f"/home/jongbin/Desktop/yolo/{input.searchId}" #경로는 각자 환경에 맞게 조장하시오
    run_Yolo(input.cctvId,yolo_save_path,input.startTime) #todo start time 따라 input다르게 만들기
    # run_Yolo(input.cctvId,yolo_save_path,"2024-05-24T01:01:01") #todo start time 따라 input다르게 만들기
    
    result_dir = await runTextReID(input.searchId,input.query, yolo_save_path) #text-re-id돌리고 결과 json파일 받아오기
    with open(result_dir, 'r') as json_file:
        data = json.load(json_file)
    image_paths = [entry['img_path'] for entry in data if 'img_path' in entry]
    destination_folder = f'/home/jongbin/Desktop/firstResult/{input.searchId}'
    os.makedirs(destination_folder, exist_ok=True)
    # 이미지 복사
    for img_path in image_paths:
        if os.path.exists(img_path):
            shutil.copy(img_path, destination_folder)

    result_json_dir = await uploadS3(result_dir,input.missingPeopleId, input.searchId, input.step,15) #json파일로 결과들 s3업로드하고 서버로 보낼 데이터 모음 json받아오기
    with open(result_json_dir, 'r') as file:
        result = json.load(file)
    
    # 이미지 경로 리스트
    return DetectResult(searchId= input.searchId, missingPeopleId= input.missingPeopleId, data = result[1:16])

#2차탐색
@app.post("/second", response_model=DetectResult)
async def secondDetection(input:SecondInput):
    print(input)
    img_download_url = "/home/jongbin/Desktop/imgDown"
    data_path = f"/home/jongbin/Desktop/firstResult/{input.firstSearchId}"
    result = []
    check = set()
    for img_path in input.queryImagePath:
        #img_path는 s3주소 특정폴더에 다운로드하고 경로가져오기
        local_image_path = os.path.join(img_download_url, os.path.basename(img_path))
        download_image_from_s3(img_path, local_image_path)
        print("dfasdfsad",local_image_path)
        data_to_save = run_Image_to_Image(data_path,10, local_image_path)
        for output in data_to_save['output']:
            #해당 주소에 있는 이미지 s3업로드하고 이미지 주소 result에 넣기
            local_output_path = output['output_dir']
            if local_output_path in check:
                continue
            check.add(local_output_path)
            new_file_name = f"{os.path.basename(local_output_path).split('.')[0]}"
            new_file_name = new_file_name.replace(' ', '-').replace(':', '').replace('/', '+')
            s3_key = f"missingPeopleId={input.missingPeopleId}/searchHistoryId={input.secondSearchId}/step=second/{new_file_name}"
            s3_url = upload_image_to_s3(local_output_path, s3_key)
            a = {"img_path" : s3_url, "cctvId" : new_file_name.split('_')[0], "similarity" :(10000-output['score'])/10000 }
            # a = {"img_path" : s3_url, "cctvId" : new_file_name.split('_')[0], "similarity" :output['score']}
            result.append(a)
            
        result = sorted(result,key = lambda x:x["similarity"])
        print(result)
    return DetectResult(searchId= input.secondSearchId, missingPeopleId= 1, data = result)

async def runTextReID(searchId : int, query : str, yolo_save_path:str):
    root_path =  os.getcwd() + "/TextReID"
    print(root_path)
    ## 저장경로 지정
    home_path = os.path.expanduser("~")
    result_dir = os.path.join(home_path, "Desktop", "result", str(searchId) ,"output.json")
    # findByText(root_path, search_num=searchId, query = query, data_dir = yolo_save_path, save_folder = result_dir)
    findByText(root_path, search_num=searchId, query = query, data_dir = yolo_save_path, save_folder = result_dir,result_num=200)
    return result_dir


async def uploadS3(json_file_path:str, missingPeopleId:int, searchId:int, step:str, lastInt:int):
    try:
        with open(json_file_path, 'r') as file:
            data = json.load(file)
    except:
        return False
    
    # 이미지 파일을 S3에 업로드하고 URL 업데이트
    errors = []
    # 리스트의 첫 번째 요소는 무시하고 나머지에서 작업 수행
    for item in data[1:lastInt]:
        img_path = item['img_path']
        similarity = item['Similarity']
        new_file_name = f"{os.path.basename(img_path).split('.')[0]}_{similarity}{os.path.splitext(img_path)[-1]}"
        new_file_name = new_file_name.replace(' ', '-').replace(':', '').replace('/', '+')
        s3_key = f"missingPeopleId={missingPeopleId}/searchHistoryId={searchId}/step={step}/{new_file_name}"
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
            item['cctvId'] = new_file_name.split('_')[0]

        except Exception as e:
            errors.append(f"Error uploading {img_path}: {str(e)}")
    
    if errors:
        return JSONResponse(status_code=500, content={"message": "Errors occurred during upload", "errors": errors})
    
    # 업데이트된 JSON 데이터를 파일로 저장
    updated_json_path = os.path.dirname(json_file_path) + 'updated_data.json'
    with open(updated_json_path, 'w') as f:
        json.dump(data, f, indent=4)

    return updated_json_path

def download_image_from_s3(s3_url, download_path):
    """
    S3 URL로부터 이미지를 다운로드하여 지정된 경로에 저장합니다.
    """
    # S3 URL을 분석하여 버킷 이름과 키를 추출
    s3_bucket, s3_key = parse_s3_url(s3_url)
    s3_client.download_file(s3_bucket, s3_key, download_path)

def parse_s3_url(s3_url):
    """
    S3 URL에서 버킷 이름과 키를 추출합니다.
    """
    if not s3_url.startswith("https://"):
        raise ValueError("S3 URL은 'https://'로 시작해야 합니다.")
    
    # URL의 앞부분 제거
    s3_url = s3_url.replace("https://", "")
    
    # 버킷 이름 추출
    s3_bucket = s3_url.split(".s3.amazonaws.com/")[0]
    
    # 객체 키 추출
    s3_key = s3_url.split(".s3.amazonaws.com/")[1]
    
    return s3_bucket, s3_key

def upload_image_to_s3(local_path, s3_key):
    """
    로컬 경로의 이미지를 S3 버킷의 지정된 키에 업로드합니다.
    """
    with open(local_path, 'rb') as img_file:
                s3_client.upload_fileobj(
                    Fileobj=img_file,
                    Bucket=bucket_name,
                    Key=s3_key,
                    ExtraArgs={
                    'ACL': 'public-read'  # 공개적으로 읽을 수 있도록 권한 설정
            })

    return f"https://{bucket_name}.s3.amazonaws.com/{s3_key}"


@app.post("/upload_images")
async def upload_images(files: List[UploadFile] = File(...)):
    saved_files = []
    UPLOAD_FOLDER = "/home/jongbin/Desktop/uploads"
    for file in files:
        file_location = os.path.join(UPLOAD_FOLDER, file.filename)
        with open(file_location, "wb") as file_object:
            file_object.write(file.file.read())
        saved_files.append(file_location)

    return JSONResponse(content={"message": "Files successfully uploaded", "files": saved_files})

@app.post('/run')
async def friyday(input:FridayInput):
    new_file_path = f"/home/jongbin/Desktop/yolo/{input.searchId}"
    if not os.path.exists(new_file_path):
        os.makedirs(new_file_path)
    await copy_image(new_file_path,input.startTime,input.endTime)
    makeJsonData(new_file_path)
    result_dir = await runTextReID(input.searchId,input.query, new_file_path) #text-re-id돌리고 결과 json파일 받아오기
    with open(result_dir, 'r') as json_file:
        data = json.load(json_file)
    result_json_dir = await uploadS3(result_dir,input.missingPeopleId, input.searchId, "FIRST",30) #json파일로 결과들 s3업로드하고 서버로 보낼 데이터 모음 json받아오기
    with open(result_json_dir, 'r') as file:
        result = json.load(file)
    
    # 이미지 경로 리스트
    return DetectResult(searchId= input.searchId, missingPeopleId= input.missingPeopleId, data = result[1:30])




def makeJsonData(save_path):
    save_path = Path(save_path)
    annotation_idx = 0
    categories = []
    annotations = []
    for filename in os.listdir(save_path):
        id = re.sub(r'\D', '', filename)
        annotation = {
            "image_id": annotation_idx,
            "id": id,
            "file_path": f"{save_path}/{filename}",
            "sentence": "",
            "onehot": []
            }
        categories.append(id)
        annotations.append(annotation)
        annotation_idx += 1

    data = {"categories": categories, "annotations": annotations}
    (save_path/'annotations').mkdir(parents=True, exist_ok=True)  # annotations folder 생성성
    jsonfiledir = f"{save_path}/annotations/annotations.json" # TextReId모델에 맞게 구조 수정
    with open(jsonfiledir, "w") as f:
        json.dump(data, f)
    print("Save Json file.")
    return jsonfiledir

async def copy_image(new_file_path,start_time,end_time):
    source_dir ="/home/jongbin/Desktop/uploads"
    start_time = datetime.strptime(start_time, "%Y-%m-%dT%H:%M:%S")
    end_time = datetime.strptime(end_time, "%Y-%m-%dT%H:%M:%S")
    for filename in os.listdir(source_dir):
        if filename.endswith(".jpg") or filename.endswith(".png"):  # 필요한 경우 파일 확장자를 조정하세요
            # 파일 이름에서 날짜와 시간을 추출
            try:
                date_str = filename.split('_')[1] + ' ' + filename.split('_')[2].split(" ")[0]
                file_time = datetime.strptime(date_str, "%Y-%m-%d %H-%M-%S")
                # 시간 범위 내에 있는지 확인
                if start_time <= file_time <= end_time:
                    source_file = os.path.join(source_dir, filename)
                    target_file = os.path.join(new_file_path, filename)
                    shutil.copy2(source_file, target_file)
            except Exception as e:
                print(e)