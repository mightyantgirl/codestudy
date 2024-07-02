// //서치 창 메뉴 생성 및 필터링 기능
// document.addEventListener('DOMContentLoaded', function () {
//   const dropdownContainer = document.getElementById('search__filter');

//   // 드롭다운 메뉴 생성
//   const dropdown = document.createElement('div');
//   dropdown.className = 'dropdown';

//   // 드롭다운 버튼 생성
//   const dropdownBtn = document.createElement('button');
//   dropdownBtn.className = 'dropdown-btn';
//   dropdownBtn.textContent = 'Sort by';
//   dropdown.appendChild(dropdownBtn);

//   //드롭다운 내용 메뉴 생성
//   const dropdownContent = document.createElement('div');
//   dropdownContent.className = 'dropdown-content';

//   const links = ['Latest', 'Earliest', 'Alphabetical'];
//   links.forEach(text => {
//     const a = document.createElement('a');
//     a.href = '#';
//     a.classList = 'filter'
//     a.textContent = text;
//     dropdownContent.appendChild(a);

//     // 링크 클릭 시 버튼 텍스트 변경
//     a.addEventListener('click', function (event) {
//       event.preventDefault(); // 링크의 기본 동작 막기

//       dropdownBtn.textContent = text;
//       dropdownContent.classList.remove('show');

//       // 선택된 필터에 따라 다르게 동작하도록 설정
//       switch (text) {
//         case 'Latest':
//           // 최신순 정렬 기능
//           sortByLatest();
//           break;
//         case 'Earliest':
//           // 오래된 순 정렬 기능
//           sortByEarliest();
//           break;
//         case 'Alphabetical':
//           // 알파벳 순 정렬 기능
//           sortByAlphabetical();
//           break;
//       }
//     });
//   });

//   dropdown.appendChild(dropdownContent);
//   dropdownContainer.appendChild(dropdown);

//   // 드롭다운 버튼 클릭 이벤트
//   dropdownBtn.addEventListener('click', function () {
//     dropdownContent.classList.toggle('show');
//   });

//   // 드롭다운 메뉴 외부 클릭 시 메뉴를 숨김
//   window.addEventListener('click', function (event) {
//     if (!event.target.matches('.dropdown-btn')) {
//       if (dropdownContent.classList.contains('show')) {
//         dropdownContent.classList.remove('show');
//       }
//     }
//   });
// });

// //정렬 기능 구현

// function sortByLatest() {
//   //최신순 정렬 함수
//   if (sortBy === 'byEdited') {
//     return notes.sort((a, b) => {
//     //b-a가 음수면 a가 위로 올라감. a가 최근일수록 상위에 두고 싶으므로 a가 크면 위로두기
//       if (a.updatedAt > b.updatedAt) {
//         return -1
//       } else if (a.updatedAt < b.updatedAt) {
//         return 1
//       } else {
//         return 0
//       }
//     })
// }}

// function sortByEarliest() {
//   //오래된순 정렬 함수
  
// }