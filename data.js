
let menu = [
  {
    title : "notion",
    date : "",
    subTitle1 : "",
  },
  {
    title : "project",
    date : "",
    subTitle1 : "",
  },
  {
    title : "nomadcoders",
    date : "2024.03.27 ~",
    subTitle1 : "자바 스크립트 클론코딩",
  },
  {
    title : "coding apple",
    date : "2024.03.09 ~",
    subTitle1 : "인스타그램을 만들며 배워보는 Vue.js",
  },
  {
    title : "code it",
    date : "2024.01.08 ~ 23",
    subTitle1 : "html/css로 웹 사이트 만들기",
  }
];

let cardLink = [
  {
    id: "notion",
    link : "",
    linkTitle : "",
  },
  {
    id: "project",
    link : "./project/mbti/index.html",
    linkTitle : "🎨 MBTI별 좋아하는 컬러",
  },
  {
    id: "project",
    link : "./project/songmuwikii/index.html",
    linkTitle : "📂 송무위키",
  },
  {
    id: "project",
    link : "./project/pomodoro/index.html",
    linkTitle : "⏰ 뽀모도로",
  },
  {
    id: "project",
    link : "./toy_project/01_register/index.html",
    linkTitle : "📒 유효성 검사 회원가입",
  },
  {
    id: "project",
    link : "./toy_project/02_note/index.html",
    linkTitle : "📋 간단 노트앱",
  },
  {
    id: "nomadcoders",
    link : "./clone/01/index.html",
    linkTitle : " 1️⃣ 바닐라js로 크롬앱 만들기 ",
  },
  {
    id: "nomadcoders",
    link : "./clone/02/index.html",
    linkTitle : " 2️⃣ 바닐라js로 드로잉 앱 만들기 ",
  },
  {
    id: "coding apple",
    link : "./vue/index.html",
    linkTitle : " 1️⃣ 허위매물 부동산 ",
  },
  {
    id: "code it",
    link : "./clone/02/index.html",
    linkTitle : " ",
  },
]
//같은 반복문 안에 쓰이는 배열안의 데이터의 갯수가 같아야 정상 작동 됨. 다를 경우 오류. 빈 배열이라도 넣어야함!


//카드 내용
let title = [];
let date = [];
let subTitle1 = [];
let link = [];
let linkTitle = [];

let menuHTML = '';
for (let i = 0; i < menu.length; i++){
  title.push(menu[i].title);
  date.push(menu[i].date);
  subTitle1.push(menu[i].subTitle1);
  // link.push(menu[i].link);
  // linkTitle.push(menu[i].linkTitle);
  //각 변수 안에 데이터 push

  // 각 메뉴에 대한 하위 요소로 링크 추가
  let subLinksHTML = '';
  for (let j = 0; j < cardLink.length; j++) {
    if (cardLink[j].id === menu[i].title) {
      //조건문을 써서 id와 title이 같으면 포함시키는거임!! ㅜㅜ 헐 이런생각 어띃개하지 id까진 생각했는데 조건문 쓰는 생각은 못햇다..
      subLinksHTML += `
        <div class="sub">
          <a id="link" href="${cardLink[j].link}" target="_blank">${cardLink[j].linkTitle}</a>
        </div>
      `;
    }
  }

  menuHTML +=`
    <div class="menu">
      <span class="main">
        ${menu[i].title}
      </span>
      <div class="sub_div">
        <div class="sub_title">
          <p class="sub_title_style">${menu[i].subTitle1}</p>
          <p class="sub_title_style_2">${menu[i].date}</p>
        </div>
        ${subLinksHTML}
      </div>
    </div>
  `;
}
//기절이다 기절

let notion = `
<div class="notion">
<div id="nav_title">📋 notion</div>
    <div class="tag">
        <a id="tag_link" href="https://scythe-guanaco-113.notion.site/01-HTML-9dd3714b2d3c495e98d07d8b9f1c24db?pvs=4" target="_blank"><span id="html" class="nav">html</a></span>
        <a id="tag_link" href="https://scythe-guanaco-113.notion.site/02-CSS-00843eb220f44c69ad5d4da8920df7cf?pvs=4" target="_blank"><span id="css" class="nav">css</a></span>
        <a id="tag_link" href="https://scythe-guanaco-113.notion.site/03-Jscript-9fe8f7033d5848d5924f71fb0aea7f0f?pvs=4" target="_blank"><span id="js" class="nav">js</a></span>
        <a id="tag_link" href="https://scythe-guanaco-113.notion.site/01-vue-aa86c35a0cfc4b229cadcd03ba34339d?pvs=4" target="_blank"><span id="vue" class="nav">vue</a></span>
    </div>
</div>`;


document.querySelector('#menu_section').innerHTML = menuHTML;
document.querySelector('#menu_section .menu').innerHTML = notion;
