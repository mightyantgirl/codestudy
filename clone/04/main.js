const semicircle = document.querySelectorAll('.semicircle');
const timer = document.querySelector('.timer');
const startBtn = document.getElementById("start-btn");
const restBtn = document.getElementById("rest-btn");

//input
const hr = 0;
const min = 1;
const sec = 1;
const hours = hr * 3600000;
const minutes = min * 60000;
const seconds = sec * 1000;
const setTime = hours + (25 * minutes) + seconds;
const restTime = hours + (5 * minutes) + seconds;

let startTime;
let futureTime;
let timerLoop;



//25분 시작 버튼
startBtn.addEventListener("click", restartTimer);

function restartTimer() {
    clearInterval(timerLoop); // 이전에 설정한 타이머 루프 중지
    startTimer(); // 새로운 타이머 시작
}


function startTimer() {
    startTime = Date.now();
    futureTime = startTime + setTime;
    timerLoop = setInterval(countDownTimer);

    // 타이머 시작 시 색상 초기화
    semicircle[0].style.backgroundColor = '#272728';
    semicircle[1].style.backgroundColor = '#272728';
    semicircle[0].style.display = 'block';
    semicircle[1].style.display = 'block';
    timer.style.color = '';
}




// 5분 휴식 버튼
restBtn.addEventListener("click", reRestTimer);

function reRestTimer() {
    clearInterval(timerLoop); // 이전에 설정한 타이머 루프 중지
    restTimer(); // 새로운 타이머 시작
}

function restTimer() {
    startTime = Date.now();
    futureTime = startTime + restTime;
    timerLoop = setInterval(countDownRestTimer);

    // 타이머 시작 시 색상 초기화
    semicircle[0].style.backgroundColor = '#272728';
    semicircle[1].style.backgroundColor = '#272728';
    semicircle[0].style.display = 'block';
    semicircle[1].style.display = 'block';
    timer.style.color = '';
}


//진행률 , 타이머 (5분 휴식)
function countDownRestTimer() {
    const currentTime = Date.now();
    const remainingTime = futureTime - currentTime;
    const angle = (remainingTime / restTime) * 360;

    if (angle > 180) {
        semicircle[2].style.display = 'none';
        semicircle[0].style.transform = 'rotate(180deg)';
        semicircle[1].style.transform = `rotate(${angle}deg)`;
    } else {
        semicircle[2].style.display = 'block';
        semicircle[0].style.transform = `rotate(${angle}deg)`;
        semicircle[1].style.transform = `rotate(${angle}deg)`;
    }

    const hrs = Math.floor((remainingTime / (1000 * 60 * 60)) % 24).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

    timer.innerHTML = `
    <div>${hrs}</div>
    <div class="colon">:</div>
    <div>${mins}</div>
    <div class="colon">:</div>
    <div>${secs}</div>`;

    if (remainingTime <= 6000) { // 5초 남았을 때
        semicircle[0].style.backgroundColor = 'red';
        semicircle[1].style.backgroundColor = 'red';
        timer.style.color = 'red';
    }

    if (remainingTime < 0) {
        clearInterval(timerLoop);
        semicircle[0].style.display = 'none';
        semicircle[1].style.display = 'none';
        semicircle[2].style.display = 'none';

        timer.innerHTML = `
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>`;

        timer.style.color = '#ebebeb';
    }
}


//진행률 , 타이머 (25분)
function countDownTimer() {
    const currentTime = Date.now();
    const remainingTime = futureTime - currentTime;
    const angle = (remainingTime / (setTime * 5)) * 360;

    if (angle > 180) {
        semicircle[2].style.display = 'none';
        semicircle[0].style.transform = 'rotate(180deg)';
        semicircle[1].style.transform = `rotate(${angle}deg)`;
    } else {
        semicircle[2].style.display = 'block';
        semicircle[0].style.transform = `rotate(${angle}deg)`;
        semicircle[1].style.transform = `rotate(${angle}deg)`;
    }

    const hrs = Math.floor((remainingTime / (1000 * 60 * 60)) % 24).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

    timer.innerHTML = `
    <div>${hrs}</div>
    <div class="colon">:</div>
    <div>${mins}</div>
    <div class="colon">:</div>
    <div>${secs}</div>`;

    if (remainingTime <= 6000) { // 5초 남았을 때
        semicircle[0].style.backgroundColor = 'red';
        semicircle[1].style.backgroundColor = 'red';
        timer.style.color = 'red';
    }

    if (remainingTime < 0) {
        clearInterval(timerLoop);
        semicircle[0].style.display = 'none';
        semicircle[1].style.display = 'none';
        semicircle[2].style.display = 'none';

        timer.innerHTML = `
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>`;

        timer.style.color = '#ebebeb';
        reRestTimer();
    }
}

