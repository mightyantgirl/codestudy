const semicircle = document.querySelectorAll('.semicircle');
const timer = document.querySelector('.timer');
const startBtn = document.getElementById("start-btn");

//input
const hr = 0;
const min = 0;
const sec = 10;
const hours = hr * 3600000;
const minutes = min * 60000;
const seconds = sec * 1000;
const setTime = hours + minutes + seconds;

let startTime;
let futureTime;
let timerLoop;

startBtn.addEventListener("click", restartTimer);

function startTimer() {
    startTime = Date.now();
    futureTime = startTime + setTime;
    timerLoop = setInterval(countDownTimer); // 1초마다 실행

    // 타이머 시작 시 색상 초기화
    semicircle[0].style.backgroundColor = '';
    semicircle[1].style.backgroundColor = '';
    timer.style.color = '';
}

function restartTimer() {
    clearInterval(timerLoop); // 이전에 설정한 타이머 루프 중지
    startTimer(); // 새로운 타이머 시작

    // 색상 재설정
    semicircle[0].style.backgroundColor = '';
    semicircle[1].style.backgroundColor = '';
    timer.style.color = '';
}

function countDownTimer() {
    const currentTime = Date.now();
    const remainingTime = futureTime - currentTime;
    const angle = (remainingTime / setTime) * 360;

    if (angle > 180) {
        semicircle[2].style.display = 'none';
        semicircle[0].style.transform = 'rotate(180deg)';
        semicircle[1].style.transform = `rotate(${angle}deg)`;
    } else {
        semicircle[2].style.display = 'block';
        semicircle[0].style.transform = `rotate(${angle}deg)`;
        semicircle[1].style.transform = `rotate(${angle}deg)`;
    }

    const hrs = Math.floor((remainingTime / (1000 * 60 * 60)) % 24).toLocaleString('en-US', {minimumIntegerDigits:2, useGrouping:false});
    const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString('en-US', {minimumIntegerDigits:2, useGrouping:false});
    const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString('en-US', {minimumIntegerDigits:2, useGrouping:false});

    timer.innerHTML =`
    <div>${hrs}</div>
    <div class="colon">:</div>
    <div>${mins}</div>
    <div class="colon">:</div>
    <div>${secs}</div>`;

    if(remainingTime <= 6000){ // 5초 남았을 때
        semicircle[0].style.backgroundColor = 'red';
        semicircle[1].style.backgroundColor = 'red';
        timer.style.color = 'red';
    }

    if (remainingTime < 0) {
        clearInterval(timerLoop);
        semicircle[0].style.display = 'none';
        semicircle[1].style.display = 'none';
        semicircle[2].style.display = 'none';

        timer.innerHTML =`
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>`;

        timer.style.color = '#ddd';
    }
}
