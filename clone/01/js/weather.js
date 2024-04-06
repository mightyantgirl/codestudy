
const API_KEY = "c7e9382181a031773f2e794c66fe0493";

function onGeoOk(position){
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  console.log("현재 위치한 곳은", lat, lng);
const API_KEY = "c7e9382181a031773f2e794c66fe0493";
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=${API_KEY}`;
  fetch(url)
    .then((Response)=> Response.json())
    .then((data) => {
        const weather = document.getElementById("#weather span:first-child");
        const city = document.getElementById("#weather span:last-child");
      city.innerText = data.name;
      weather.innerText = data.weather[0].main;
    })
};
function onGeoError(){
  alert("사용자 위치를 확인할 수 없어 날씨정보를 불러올 수 없습니다.");
};

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
//위치정보를 불러오는 코드라구 함 ㄷ ㄷ getCurrentPosition < 이거 쓰면 나오는 안내문에 방법 다 잇음.