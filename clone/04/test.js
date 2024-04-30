let intro = document.getElementById("intro-area");
let id = document.getElementById('id');
let password = document.getElementById('password');
let loginArea = document.getElementById('login-area');
let loginBtn = document.getElementById('login-btn');


//인풋에 입력된 value 로컬스토리지에 저장
function saveValue(e) {
  let id = e.id;
  let val = e.value;
  localStorage.setItem(id, val);
  //setItem : 로컬스토리지에 값 저장
  //파라미터로 전달받은 아이디값을 키로 객체에 저장함
}

function onLogin() {
  saveValue(id);
  saveValue(password);
  loginArea.style.display = 'none';
  intro.innerHTML = `안녕하세요 ${id.value}님!`;
}


let saveUserName = localStorage.getItem('id');

//setItem:값 저장
//getItem:값 불러오기

if (saveUserName === null) {
  //id.value 저장된게 없다면(=최초로그인)
  loginBtn.addEventListener("click", onLogin);
} else {
  //저장된 내용이 있다면
  intro.innerHTML = `다시 만나서 반가워요 ${saveUserName}님!`;
  loginArea.style.display = 'none';
}

// 타이머
let timerElement = document.getElementById('timer');
let startBtn = document.getElementById('startBtn');
let pauseBtn = document.getElementById('pauseBtn');
let resetBtn = document.getElementById('resetBtn');
let timerInterval;
let timerValue = localStorage.getItem('countdownTimer') || 0;

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    localStorage.setItem('countdownTimer', timerValue);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerValue = 0;
    localStorage.removeItem('countdownTimer');
    updateTimer();
}

function updateTimer() {
    timerValue--;
    if (timerValue < 0) {
        clearInterval(timerInterval);
        timerValue = 0;
        localStorage.removeItem('countdownTimer');
        return;
    }

    let hours = Math.floor(timerValue / 3600);
    let minutes = Math.floor((timerValue % 3600) / 60);
    let seconds = timerValue % 60;

    let formattedTime = 
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds;

    timerElement.textContent = formattedTime;
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateTimer();