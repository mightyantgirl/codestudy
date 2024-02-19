let blink_speed = 1000;
let newTag = document.querySelector(".new-tag"); // 예시: 클래스명이 "new-tag"인 요소를 선택

setInterval(function(){
  newTag.style.display = newTag.style.display == 'none' ? '' : 'none';
}, blink_speed);