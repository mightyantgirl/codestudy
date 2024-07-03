document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('register-form');
  const usernameField = document.getElementById('name');
  const usernameError = document.getElementById('name-error-message');
  const emailField = document.getElementById('email');
  const emailError = document.getElementById("email-error-message");
  const passwordField = document.getElementById("password-field");
  const passwordInputs = passwordField.querySelectorAll("input[type='password']");
  const passwordError1 = document.getElementById("password-error-message__1");
  const passwordError2 = document.getElementById("password-error-message__2");

  form.addEventListener("submit", function(e){
    let valid = true;

    // 이름 유효성 검사
    const name = usernameField.value;
    if (name.length < 2 || !validateName(name)) {
      usernameError.style.display = "block";
      valid = false;
    } else {
      usernameError.style.display = "none";
    }

    // 이메일 유효성 검사 
    const email = emailField.value;
    if (!validateEmail(email)) {
      emailError.style.display = "block";
      valid = false;
    } else {
      emailError.style.display = "none";
    }

    // 비밀번호 유효성 검사
    const password1 = passwordInputs[0].value;
    const password2 = passwordInputs[1].value;
    if (password1 !== password2) {
      passwordError1.style.display = "block";
      passwordError2.style.display = "none"; // 비밀번호 불일치 시 길이 오류 메시지 숨김
      valid = false;
    } else if (password1.length < 10) {
      passwordError2.style.display = "block";
      passwordError1.style.display = "none"; // 비밀번호 길이 오류 시 불일치 메시지 숨김
      valid = false;
    } else {
      passwordError1.style.display = "none";
      passwordError2.style.display = "none";
    }

    if (!valid) {
      e.preventDefault();
    }
  });

  function validateEmail(email){
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRe.test(email);
  }

  function validateName(name){
    const nameRe = /^[가-힣]*$/;
    return nameRe.test(name);
  }
});
