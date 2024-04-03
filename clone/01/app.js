// const loginForm = document.querySelector("#login-form");
// const loginInput = loginForm.querySelector("input";)

const loginInput = document.querySelector("#login-form input");
const loginButton = document.querySelector("#login-form button");

function loginBtnClick() {
    let username = loginInput.value;
    if(username === ''){
        //''는 문자형의 초기값
        alert("영문과 숫자로 이루어진 아이디를 입력해주세요!");
    }else if(username.length > 15){
        alert(`${username}은 너무 깁니다. 15자 이하의 아이디를 입력해주세요.`)
    }else {
        alert(`어서오세요 ${username}님!`);
    }
};

loginButton.addEventListener("click", loginBtnClick);