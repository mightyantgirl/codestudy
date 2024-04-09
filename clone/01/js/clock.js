const clock = document.querySelector("h2#clock");
//html안의 시계태그 변수 선언

clock.innerText = "이것은 시계다.";

function getClock() {
  let date = new Date();
  let hr = String(date.getHours()).padStart(2, "0");
  let min = String(date.getMinutes()).padStart(2, "0");
  let sec = String(date.getSeconds()).padStart(2, "0");
  clock.innerText=(`${hr}:${min}`);
  //html clock변수안에 시계 불러오긔
};

// setInterval(sayHello, 3000);
// //setInerval은 두번째 파라미터 안의 시간마다 1번 씩 첫번째 파라미터의 함수를 실행하는 기능.
// setTimeout(sayHello, 3000);
// //setTimeout은 첫번째 파라미터의 기능을 최초 로딩시간으로부터 두번째 파라미터의 시간이 흐른 후 1번 실행하는 기능.

getClock();
//시계를 불러오고
setInterval(getClock, 1000);
//시계함수를 1초마다 시간이 흐른뒤 다시 실행하도록