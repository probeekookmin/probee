파이썬 버전 3.10.12
쿠다 버전 11
cudnn버전 9
우분투 22.04.6


서버 실행 방법 : 
ai 폴더에서
ai서버 로컬 테스트 시 : uvicorn app:app --reload
ai서버 정식 오픈 : uvicorn app:app --host 0.0.0.0 --port 8080 --reload

환경변수 추가:
.env 파일을 추가하여 환경변수에 `OPENAI_API_KEY` 를 추가하여야 함