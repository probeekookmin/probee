##

```bash
requirement.md 설치
pip install -r requirements.txt
```

실행 명령어

```bash
python3 detect.py --weights crowdhuman_yolov5m.pt --source /home/jongbin/Desktop/cctv/12/2024-05-11 --person
```

도커 빌드 커맨드

```bash
docker build -t yolo .
```

실행중인 도커 확인

```bash
docker ps
```

컨테이너 종료하기

```bash
docker stop [컨테이너 id]
```

interactive 모드로 컨테이너실행

```bash
docker run -it yolo
```

작업폴더 연동하려면

```bash
docker run -it -v /Users/nojongbin/Desktop/yolo:/app/runs  yolo
```

## Head & Person Detection Model

### Download model trained on crowd human using yolov5(m) architeture

Download Link: [YOLOv5m-crowd-human](https://drive.google.com/file/d/1gglIwqxaH2iTvy6lZlXuAcMpd_U0GCUb/view?usp=sharing)

<br/>

**Output (Crowd Human Model)**

![image](https://drive.google.com/uc?export=view&id=1ZOhDBRXj-Ra0vPL7iG6lrxCWAFhJTAti)

<br/>

## Test

```bash
$ python detect.py --weights crowdhuman_yolov5m.pt --source _test/ --view-img

```

## Test (Only Person Class)

```bash
python3 detect.py --weights crowdhuman_yolov5m.pt --source _test/ --view-img  --person
```

## Test (Only Heads)

```bash
python3 detect.py --weights crowdhuman_yolov5m.pt --source _test/ --view-img  --heads
```
