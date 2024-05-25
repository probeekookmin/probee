let slideIndexScenario = 1;
showSlidesScenario(slideIndexScenario);

// 다음/이전 컨트롤
function plusSlidesScenario(n) {
    showSlidesScenario(slideIndexScenario += n);
}

// 현재 슬라이드를 보여줌
function currentSlideScenario(n) {
    showSlidesScenario(slideIndexScenario = n);
}

function showSlidesScenario(n) {
    let i;
    let slidesScenario = document.getElementsByClassName("mySlidesScenario");
    let dotsScenario = document.getElementsByClassName("dot");
    if (n > slidesScenario.length) {slideIndexScenario = 1}
    if (n < 1) {slideIndexScenario = slidesScenario.length}
    for (i = 0; i < slidesScenario.length; i++) {
        slidesScenario[i].style.display = "none";  
    }
    for (i = 0; i < dotsScenario.length; i++) {
        dotsScenario[i].className = dotsScenario[i].className.replace(" active", "");
    }
    slidesScenario[slideIndexScenario-1].style.display = "block";  
    dotsScenario[slideIndexScenario-1].className += " active";
}
