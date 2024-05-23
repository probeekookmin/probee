let slideIndexGuardian = 1;
showSlidesGuardian(slideIndexGuardian);

// 다음/이전 컨트롤
function plusSlidesGuardian(n) {
    showSlidesGuardian(slideIndexGuardian += n);
}

// 현재 슬라이드를 보여줌
function currentSlideGuardian(n) {
    showSlidesGuardian(slideIndexGuardian = n);
}

function showSlidesGuardian(n) {
    let i;
    let slidesGuardian = document.getElementsByClassName("mySlidesGuardian");
    let dotsGuardian = document.getElementsByClassName("dotGuardian");
    if (n > slidesGuardian.length) {slideIndexGuardian = 1}
    if (n < 1) {slideIndexGuardian = slidesGuardian.length}
    for (i = 0; i < slidesGuardian.length; i++) {
        slidesGuardian[i].style.display = "none";  
    }
    for (i = 0; i < dotsGuardian.length; i++) {
        dotsGuardian[i].className = dotsGuardian[i].className.replace(" active", "");
    }
    slidesGuardian[slideIndexGuardian-1].style.display = "block";  
    dotsGuardian[slideIndexGuardian-1].className += " active";
}
