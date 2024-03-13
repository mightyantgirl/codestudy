//메모 모달 끄고켜기
document.getElementsByClassName('modal_open_btn')[0].addEventListener('click', function(){
  document.getElementsByClassName('modal')[0].classList.toggle('show');
});

document.getElementsByClassName('modal_close_btn')[0].addEventListener('click', function(){
  document.getElementsByClassName('modal')[0].classList.toggle('show');
});

//new뱃지 반짝이는 에니메이션
let blink_speed = 800;
let newTag = document.querySelector(".new-tag"); // 예시: 클래스명이 "new-tag"인 요소를 선택

setInterval(function(){
  newTag.style.display = newTag.style.display == 'none' ? '' : 'none';
}, blink_speed);


//역할/극 배열
let year = ["2024", "2024","2024-2023","2023","2023-2022","2022","2022","2022","2022-2021",]
let roles = ["몬티 나바로", "파비앙", "라울", "브라운", "루카스", "김동호", "강우석", "아더", "김옥균"];
let titles = ["젠틀맨스 가이드", "비아 에어 메일", "오페라의 유령","레드북", "이프/덴", "서편제", "모래시계", "킹아더", "곤 투모로우"];

//극 필터 배열
let filterYear = ["2018", "2019", "2020", "2021", "2022", "2023", "2024"]

//극 필터 반복문
function dropdown() {
  let filterHTML = '';
  for (let i = 0; i < filterYear.length; i++) {
    filterHTML += `
    <div id="filter${i}" class="filter_year">
    ${filterYear[i]}</div>
    `;
  }
  document.getElementById('filter').innerHTML = filterHTML;
}

let menu = document.querySelector('.dropdown'); // 메뉴 전체 선택

menu.addEventListener('click', function(){
  dropdown(); // 드롭다운 표시
});

menu.addEventListener('mouseleave', function(){
  document.getElementById('filter').innerHTML = ''; // 필터를 비움
});


let links = [
  { url: "https://twitter.com/swg_archive/status/1759779269356790058/photo/1" },
  { url: "https://namu.wiki/w/Via%20Air%20Mail" },
  { url: "https://namu.wiki/w/%EC%98%A4%ED%8E%98%EB%9D%BC%EC%9D%98%20%EC%9C%A0%EB%A0%B9(%EB%AE%A4%EC%A7%80%EC%BB%AC)" },
  { url: "https://namu.wiki/w/%EB%A0%88%EB%93%9C%EB%B6%81" },
  { url: "https://namu.wiki/w/%EC%9D%B4%ED%94%84/%EB%8D%B4" },
  { url: "https://namu.wiki/w/%EC%84%9C%ED%8E%B8%EC%A0%9C(%EB%AE%A4%EC%A7%80%EC%BB%AC)" },
  { url: "https://namu.wiki/w/%EB%AA%A8%EB%9E%98%EC%8B%9C%EA%B3%84(%EB%AE%A4%EC%A7%80%EC%BB%AC)" },
  { url: "https://namu.wiki/w/%ED%82%B9%EC%95%84%EB%8D%94" },
  { url: "https://namu.wiki/w/%EA%B3%A4%20%ED%88%AC%EB%AA%A8%EB%A1%9C%EC%9A%B0" }
];

// HTML에 삽입할 변수 생성
let cardsHTML = '';

//문자열 안에서 변수를 사용하려면 ${}사용
for (let i = 0; i < roles.length; i++) {
  let cardHTML = `
    <div id="card${i}" class="card">
      <div class="content">
        <h3>${year[i]}</h3>
        <a class="worktitle">${titles[i]}</a><br>
        <a class="role">${roles[i]}</a>
      </div>
      <div class="button" id="more${i}">
        more +
      </div> 
    </div>
  `;
  // 생성된 카드를 cardsHTML에 추가
  cardsHTML += cardHTML;
}

document.getElementById('container').innerHTML = cardsHTML;

//more버튼 링크 적용
for (let i = 0; i < roles.length; i++) {
  let button = document.getElementById(`more${i}`);
  button.addEventListener('click', function() {
    let link = links[i].url;
    window.open(link, '_blank');
  });
}