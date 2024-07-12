//서치 창 메뉴 생성 및 필터링 기능
document.addEventListener('DOMContentLoaded', function () {
  const dropdownContainer = document.getElementById('search__filter');

  // 드롭다운 메뉴 생성
  const dropdown = document.createElement('div');
  dropdown.className = 'dropdown';

  // 드롭다운 버튼 생성
  const dropdownBtn = document.createElement('button');
  dropdownBtn.className = 'dropdown-btn';
  dropdownBtn.textContent = 'Sort by';
  dropdown.appendChild(dropdownBtn);

  //드롭다운 내용 메뉴 생성
  const dropdownContent = document.createElement('div');
  dropdownContent.className = 'dropdown-content';

  const links = ['Latest', 'Earliest', 'Alphabetical'];
  links.forEach(text => {
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = text;
    dropdownContent.appendChild(a);

    // 링크 클릭 시 버튼 텍스트 변경
    a.addEventListener('click', function (event) {
      event.preventDefault(); // 링크의 기본 동작 막기
      dropdownBtn.textContent = text;
      dropdownContent.classList.remove('show');
    });
  });

  dropdown.appendChild(dropdownContent);
  dropdownContainer.appendChild(dropdown);

  // 드롭다운 버튼 클릭 이벤트
  dropdownBtn.addEventListener('click', function () {
    dropdownContent.classList.toggle('show');
  });

  // 드롭다운 메뉴 외부 클릭 시 메뉴를 숨김
  window.addEventListener('click', function (event) {
    if (!event.target.matches('.dropdown-btn')) {
      if (dropdownContent.classList.contains('show')) {
        dropdownContent.classList.remove('show');
      }
    }
  });
});


//노트 리스트 화면
