//쿼리셀렉터로 DOM호출
const EMAIL_REGEXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const NAME_REGEXP = /^[가-힣]{2,15}$/;
const PASSWORD_MIN_LEN = 10;

const nameField = document.querySelector('#name-field');
const nameErrorMessage = document.querySelector('#name-error-message');
const emailField = document.querySelector('#email-field');
const emailErrorMessage = document.querySelector('#email-error-message');
const passwordField = document.querySelector('#password-field');
const passwordErrorMessage = document.querySelector('#password-error-message');
const registerForm = document.querySelector('#register-form');

//회원가입 폼 input 이벤트리스너 함수 호출
registerForm.addEventListener('input', handleFormInput);

function handleFormInput(e) {
  const input = e.target;
  const form = e.currentTarget;

  if (input.name === 'email') {
    //이메일 유효성 검사
    const email = form['email'].value.trim();
    //form에 입력된 값 변수 저장
    //trim메서드 : 양끝의공백을삭제하여 더 정확한 유효성 확인가능.
    const validateEmail = EMAIL_REGEXP.test(email);
    emailField.classList.toggle('invalid', !validateEmail);
    emailField.classList.toggle('success', validateEmail);
    //이메일이 유효하지 않은 경우/유효한 경우 각 css클래스 추가
    emailErrorMessage.textContent = validateEmail ? '' : '올바르지 않은 이메일입니다.';
    //삼항연산자 활용 : 오류메세지 노출

  } else if (input.name === 'password' || input.name === 'password-repeat') {
    //비밀번호 유효성검사
    const password = form['password'].value.trim();
    const passwordRepeat = form['password-repeat'].value.trim();
    //form에 입력된 값 변수 저장

    const isPasswordEqual = password === passwordRepeat;
    //비밀번호와 비밀번호 확인이 같은 지 확인하는 변수
    const isPasswordlengthValid =
      //비밀번호와 비밀번호 확인의 글자수가 최소 수를 확인하는 지 확인하는 변수
      password.length >= PASSWORD_MIN_LEN &&
      //패스워드 글자 수가 저장한 정규표현식의 글자 수와 같거나 큰지
      passwordRepeat.length >= PASSWORD_MIN_LEN;
    //위와 동일
    const validatePassword = isPasswordEqual && isPasswordlengthValid;

    passwordField.classList.toggle('invalid', !validatePassword);
    passwordField.classList.toggle('success', validatePassword);
    //비밀번호가 유효하지 않은 경우 css클래스 추가
    const message = [];
    //오류메세지 저장 변수
    if (!isPasswordEqual) {
      //비밀번호가 서로 다른 경우
      message.push('비밀번호가 서로 다릅니다.');
    }
    if (!isPasswordlengthValid) {
      //비밀번호가 일정 수 보다 짧은 경우
      message.push(`비밀번호는 ${PASSWORD_MIN_LEN}자 이상이어야 합니다.`)
    }
    passwordErrorMessage.innerHTML = message.join('<br>');
    //HTMl

  } else if (input.name === 'name') {
    //이름 유효성 검사
    const name = form['name'].value.trim();
    const validateName = NAME_REGEXP.test(name);
    //이름을 기입하지 않은 경우 

    nameField.classList.toggle('invalid', !validateName);
    nameField.classList.toggle('success', validateName);
    //이름이 유효하지 않은 경우 클래스 추가
    nameErrorMessage.textContent = validateName ? '' : '이름을 입력해주세요.';
    //오류메세지 노출
  }
};