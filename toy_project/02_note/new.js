const newNote = document.querySelector('#note-new-create');
const search = document.querySelector('#search');
const mainNote = document.querySelector('#note-list');

const noteBtn = document.querySelector('.note__btn');
const saveBtn = document.querySelector('#note__btn--save');
const newNoteBtn = document.querySelector('#new-btn');
const removeBtn = document.querySelector('#note__btn--remove');

//로컬스토리지에 memos라는 키를 생성함
let memos = JSON.parse(localStorage.getItem('memos'));
memos = memos ?? [];

// 페이지 로드마다 메모 리스트 초기화
setMemo();

// 1. 새로쓰기 버튼을 클릭할 때 기존 리스트 화면 숨기고 새로쓰기 창을 나타냄
newNoteBtn.addEventListener('click', function (e) {
  e.preventDefault();
  showNewNote();
});

// 2. 뒤로가기 버튼을 클릭할 때 실행되는 이벤트 리스너
removeBtn.addEventListener('click', function () {
  let memoTitle = newNote.querySelector('#note-box-create__title').value;
  let memoContent = newNote.querySelector('#note-box-create__content').value;

  // 제목 또는 내용 중 하나라도 입력된 경우
  if (memoTitle || memoContent) {
    const result = confirm('작성 중인 내용이 있는뎁쇼? 뒤로 진짜 갈겁니꺼?');
    if (result) {
      showMainNote();
    }
  } else {
    // 제목과 내용 둘 다 비어있으면 별도의 confirm이 필요치 않음.
    showMainNote();
  }
});

// 메모 리스트 보이기 함수
function showMainNote() {
  newNote.style.display = 'none'; // 새 메모 작성 창 숨기기
  mainNote.style.display = 'block'; // 메모 리스트 화면 보이기
  newNoteBtn.style.display = 'block'; // 새로 쓰기 버튼 보이기
  search.style.display = 'flex';

}


// 새로 쓰기 화면 보이기 함수
function showNewNote() {
  newNote.style.display = 'block';// 새 메모 작성 창 보이기
  mainNote.style.display = 'none';// 메모 리스트 화면 숨기기
  newNoteBtn.style.display = 'none';// 새로 쓰기 버튼 숨기기
  search.style.display = 'none';
}


//3. 저장하기 버튼을 클릭할때 실행되는 이벤트 리스너
saveBtn.addEventListener('click', function () {
  let newMemo = {};
  let memoTitle = newNote.querySelector('#note-box-create__title').value;
  let memoContent = newNote.querySelector('#note-box-create__content').value;
  let now = new Date();

  //저장할말을 물어보는 confirm
  if (memoTitle || memoContent) {
    // 제목 또는 내용 중 하나라도 입력된 경우
    const result = confirm('메모를 저장하시겠어용?');
    if (result) {
      saveMemo(); //메모 저장 함수 호출
      showMainNote();
    } else {
      // 아니오를 선택한 경우의 처리
      // 별다른 처리를 하지 않으면 작성 중이던 창으로 돌아갑니다
    }
  } else {
    // 제목과 내용 둘 다 비어있으면 얼럿송신
    alert('내용이 비어있습니다!');
  }
});


// 3-1 새 메모를 메인 리스트에 추가하는 함수
function saveMemo() {
  let newMemo = {};
  let memoTitle = newNote.querySelector('#note-box-create__title').value;
  let memoContent = newNote.querySelector('#note-box-create__content').value;
  let now = new Date();

  // 로컬스토리지에서 id 값을 가져오고 없으면 0으로 설정
  let id = JSON.parse(localStorage.getItem('id'));
  id = id ?? 0;

  // newMemo 객체에 id, 제목, 내용, 날짜 저장
  newMemo.id = id;
  newMemo.title = memoTitle;
  newMemo.content = memoContent;
  newMemo.date = `${now.getDate()}`;
  newMemo.month = `${now.getMonth() + 1}`;
  newMemo.day = `${now.getDay()}`;
  memos.push(newMemo);

  // 메모와 id 저장
  localStorage.setItem('memos', JSON.stringify(memos));
  localStorage.setItem('id', JSON.stringify(++id));

  // 제목, 내용 필드 초기화
  newNote.querySelector('#note-box-create__title').value = '';
  newNote.querySelector('#note-box-create__content').value = '';

  // 메모 리스트 갱신
  setMemo();
}

// 메모 리스트 갱신 함수
function setMemo() {
  const noteList = document.querySelector('#note-list');
  const dayList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const monthList = ['January', 'February', 'March', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // 메모 리스트 초기화
  noteList.innerHTML = '';

  // 메모 리스트 업데이트
  for (let i = memos.length - 1; i >= 0; i--) {
    // note-container div 생성
    let noteContainer = document.createElement('div');
    noteContainer.classList.add('note-container');
    noteContainer.dataset.id = memos[i].id;

    // 날짜 div 생성
    let date = document.createElement('div');
    date.id = 'note-date';
    date.textContent = memos[i].date;

    //요일 div 생성
    let day = document.createElement('div');
    day.id = 'note-dayofweek';
    day.textContent = dayList[memos[i].day];

    //월 div 생성
    let month = document.createElement('div');
    month.id = 'note-month';
    month.textContent = monthList[memos[i].month];

    // 내용 div 생성
    let content = document.createElement('div');
    content.id = 'note-content';
    content.textContent = memos[i].content;

    // 수정버튼 div 생성
    let modify = document.createElement('div');
    modify.id = 'note-modify';
    modify.textContent = 'modify';
    modify.style.display = 'none'; // 초기 상태는 숨김

    // 왼쪽 부분 생성 및 추가
    let leftDiv = document.createElement('div');
    leftDiv.classList.add('note-container_left');
    leftDiv.appendChild(date);
    leftDiv.appendChild(content);

    // 오른쪽 부분 생성 및 추가
    let rightDiv = document.createElement('div');
    rightDiv.classList.add('note-container_right');
    rightDiv.appendChild(day);
    rightDiv.appendChild(month);
    rightDiv.appendChild(modify);

    // noteContainer에 왼쪽, 오른쪽 부분 추가
    noteContainer.appendChild(leftDiv);
    noteContainer.appendChild(rightDiv);

    // note_list에 noteContainer 추가
    noteList.appendChild(noteContainer);

    // 수정버튼 자바스크립트를 사용한 Hover 기능 추가
    noteContainer.addEventListener('mouseenter', function () {
      modify.style.display = 'block';
    });

    noteContainer.addEventListener('mouseleave', function () {
      modify.style.display = 'none';
    });

    // 수정 버튼 이벤트 핸들러 등록
    modify.addEventListener('click', function (e) {
      const memoId = e.target.closest('.note-container').dataset.id;
      editMemo(memoId);
      showNewNote();
    });
  }
}

// 수정 버튼 클릭 이벤트 리스너 설정 (이벤트 위임 사용)
//modifyBtn는 페이지가 처음 로드될 때는 존재하지 않기 때문에 이벤트리스너가 적용되지 않음.
//부모요소에 이벤트요소를 추가하고, 이벤트가 발생할 때 이벤트의 target을 이용해 요소를 확인
document.querySelector('#note-list').addEventListener('click', function (e) {
  if (e.target && e.target.id === 'note-modify') {
    const memoId = e.target.closest('.note-container').dataset.id;
    editMemo(memoId);
    showNewNote();
    registerModifyButtonEvents();
  }
});

// 수정 버튼 클릭 시 기존 작성된 내용 불러오기 
//파인드인덱스, 파인드는 챗지피티도움으로 하긴했는데 이해가 어렵군아...
function editMemo(id) {
  const index = memos.findIndex(m => m.id == id);
  if (index !== -1) {
    const memo = memos[index];
    document.querySelector('#note-box-create__title').value = memo.title;
    document.querySelector('#note-box-create__content').value = memo.content;
    showNewNote();
    memos.splice(index, 1);
  }
};

function registerModifyButtonEvents() {
  const modifyButtons = document.querySelectorAll('#note-list .note-modify');
  modifyButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      const memoId = e.target.closest('.note-container').dataset.id;
      editMemo(memoId);
      showNewNote();
    });
  });
}

// 삭제버튼 클릭 시 현재 불러와진 내용 삭제하기
