# 💻 경찰 측 화면

<link rel="stylesheet" type="text/css" href="style.css">
<script src="script.js" defer></script>

<!-- 슬라이드쇼 컨테이너 -->
<div class="slideshow-container">
    <!-- 숫자와 캡션이 있는 이미지 -->
    <div class="mySlides fade">
        <div class="numbertext">1 / 4</div>
        <img src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/18fd90f9-7e4b-4092-b994-f88356499cab" style="width:100%">
        <div class="text">첫 번째 사진</div>
    </div>
    <div class="mySlides fade">
        <div class="numbertext">2 / 4</div>
        <img src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/a6533a08-b3da-46f9-8fd0-57e3dbf59b91" style="width:100%">
        <div class="text">두 번째 사진</div>
    </div>
    <div class="mySlides fade">
        <div class="numbertext">3 / 4</div>
        <img src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/0c293977-bf79-4360-84af-962b2f5b24e0" style="width:100%">
        <div class="text">세 번째 사진</div>
    </div>
    <div class="mySlides fade">
        <div class="numbertext">4 / 4</div>
        <img src="https://github.com/kookmin-sw/capstone-2024-14/assets/84088060/0c293977-bf79-4360-84af-962b2f5b24e0" style="width:100%">
        <div class="text">네 번째 사진</div>
    </div>
    <!-- 다음, 이전 이미지 버튼 -->
    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a>
</div>
<br>

<!-- 현재 이미지를 알려주는 하단의 점 -->
<div style="text-align:center">
    <span class="dot" onclick="currentSlide(1)"></span> 
    <span class="dot" onclick="currentSlide(2)"></span> 
    <span class="dot" onclick="currentSlide(3)"></span> 
    <span class="dot" onclick="currentSlide(4)"></span> 
</div>
