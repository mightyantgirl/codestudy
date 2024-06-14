//쿼리셀렉터로 DOM호출
document.addEventListener("DOMContentLoaded", function () {
const form = document.getElementById('register-form');
const usernameField = document.getElementById('name-field');
const emailField = document.getElementById('email-field');
const emailError = document.getElementById("email-error-message");
const passwordField = document.getElementById("password-field");
const passwordInputs = passwordField.querySelectorAll("input[type='password']");
const passwordError = document.getElementById("password-error-message");

form.addEventListener("submit", function(e){
  let valid = true;

  // 이메일 유효성 검사 
  const email = emailField.value;
  if(!validateEmail(email)){
    emailError.style.display = "block";
    valid = false;
  } else {
    emailError.style.display = "none";
  }

  //비밀번호 유효성 검사
  const password1 = passwordInputs[0].value;
  const password2 = passwordInputs[1].value;
  if (password1 !== password2 || password1.length < 10) {
    passwordError.style.display = "block";
    valid = false;
  } else {
    passwordError.style.display = "none";
  }

  if (!valid) {
    e.preventDefault();
  }
});

  function validateEmail(email){
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});

