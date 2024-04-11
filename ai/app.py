from flask import Flask


import sys
from pathlib import Path

print("Aaaa",Path(__file__).parent)
sys.path.append(str(Path(__file__).parent))
sys.path.append(str(Path(__file__).parent)+"/yolov5_crowdhuman")
sys.path.append(str(Path(__file__).parent)+"/TextReID")
from TextReID.test_net import main as run_text_reid
from yolov5_crowdhuman.detect import run_detection

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/yolo')
def run_yolo():
    resultDir = run_detection(weights='crowdhuman_yolov5m.pt', source='yolov5_crowdhuman/test/r2', person=True)
    with open(resultDir, 'r') as file:
        return file.read()

if __name__ == '__main__':
    app.run(host = '0.0.0.0', debug=True, port=8080)