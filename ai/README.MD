파이썬 버전 3.10.12
쿠다 버전 11.8
cudnn버전 8.6
우분투 22.04.6


## yolo실행 세팅
https://drive.google.com/file/d/14JWI1reDR_MO6IzGtTzPkgBVT3b6Uqad/view?usp=sharing
다운로드 후 yolo5_crowdhuman폴더(yolo만 실행시킬때 ) 및 ai폴더 하단(서버에서 실행시킬때)에 복사

## TextReID실행 세팅
https://drive.google.com/file/d/1gd14A7uanCf5mPiJKeL2C1HJ_QHp6C7k/view?usp=drive_link
다운로드 후 압축해제.
압축해제 후 나오는 3가지의 폴더를 모두 textReId폴더에 넣어주면 됨.

## 서버 실행 방법 
ai 폴더에서
ai서버 로컬 테스트 시 : uvicorn app:app --reload --port 8080 --host 0.0.0.0
ai서버 정식 오픈 : nohup uvicorn app:app --host 0.0.0.0 --port 8080 --reload &

## 서버 환경변수 (.env 파일)
`OPENAI_API_KEY`
`AWS_ACCESS_KEY_ID `
`AWS_SECRET_ACCESS_KEY `

