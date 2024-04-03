
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";
//string만 포함 된 변수는 대문자로 표기하고, string을 저장하고 싶을 때 사용
//중요한 정보를 담은 게 아니라서 대문자로 작성
//만약 이 변수에 오타가 있으면 콘솔로 알려주기때문에 수정용이


//**로그인 form
function onLoginSubmit(event) {
    // let username = loginInput.value;
    // if(username === ''){
    //     //''는 문자형의 초기값
    //     alert("영문과 숫자로 이루어진 아이디를 입력해주세요!");
    // }else if(username.length > 15){
    //     alert(`${username}은 너무 깁니다. 15자 이하의 아이디를 입력해주세요.`)
    // }else {
    //     alert(`어서오세요 ${username}님!`);
    // }
    event.preventDefault();
    //submit의 기본행동(서버에 정보를 보냄)을 막음!
    let username = loginInput.value;
    //인풋값 변수 선언
    localStorage.setItem(USERNAME_KEY, username);
    //로컬 스토리지에 key,인풋value(유저명) 저장(oh wow)
    loginForm.classList.add(HIDDEN_CLASSNAME);
    //폼을 숨기는 css스타일 form class에 추가
    greeting.innerText = `안녕하세요 ${username} 님!`;
    //greeting 변수 안에 인삿말 text추가
    greeting.classList.remove(HIDDEN_CLASSNAME);
    //숨겨져있던 greeting css스타일인 class제거하여 화면에 표시
};


//** 최초 로그인 후, 다시 로그인 했을 때 로컬스토리지에 저장되었던 값을 불러오는 조건문
const saveUsername = localStorage.getItem(USERNAME_KEY);
// 변수 안에 username의 값을 저장

if(saveUsername === null){
  //username이 작성되지 않았다면
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    //hidden 삭제해서 숨겼던 form을 다시 보여주고
    loginForm.addEventListener("submit", onLoginSubmit);
    //form작성하는 함수를 작동할거임.
} else {
  //username이 작성 되었다면?
    greeting.innerText = `다시 만나서 반가워요 ${saveUsername} 님!`;
    //저장되었던 username을 불러오고
    greeting.classList.remove(HIDDEN_CLASSNAME);
    //hidden 삭제해서 숨겼던 h1을 다시 보여줄거임.
}
