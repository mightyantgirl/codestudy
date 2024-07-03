import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid';
export function generateUUID() {
  return uuidv4();
}

const newNote = document.querySelector('#note-new-create');
const search = document.querySelector('#search');
const mainNote = document.querySelector('#note-list');
const noteBox = document.querySelector('.note-box');

const saveBtn = document.querySelector('#note__btn--save');
const newNoteBtn = document.querySelector('#new-btn');
const removeBtn = document.querySelector('#note__btn--remove');
const deleteBtn = document.querySelector('#note__btn--delete');

//로컬스토리지에 memos라는 키를 생성함
let memos = JSON.parse(localStorage.getItem('memos'));
memos = memos ?? [];

// 페이지 로드마다 메모 리스트 초기화, 최신순 정렬
setMemo();
sortByLatest();


// 1. 새로쓰기 버튼을 클릭할 때 기존 리스트 화면 숨기고 새로쓰기 창을 나타냄
newNoteBtn.addEventListener('click', function () {
  clearNoteFields();
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
  clearNoteFields();
}

// 새로 쓰기 화면 보이기 함수
function showNewNote() {
  newNote.style.display = 'block';// 새 메모 작성 창 보이기
  mainNote.style.display = 'none';// 메모 리스트 화면 숨기기
  newNoteBtn.style.display = 'none';// 새로 쓰기 버튼 숨기기
  search.style.display = 'none';

  // 수정 화면에서 삭제버튼 노출 조건
  let memoContent = newNote.querySelector('#note-box-create__content').value;
  let memoTitle = newNote.querySelector('#note-box-create__title').value;
  if (memoContent == "" && memoTitle == "") {
    deleteBtn.style.display = 'none';
  } else {
    deleteBtn.style.display = 'inline';
  }
}

// 3. 저장하기 버튼을 클릭할때 실행되는 이벤트 리스너
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
      setMemo();
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
// 메모 아이디를 확인해 새 메모인지 기존 메모 수정인지 확인
//새 메모인 경우 addMemoToList() 함수를 호출, 기존 메모를 수정하는 경우 updateMemoInList() 함수를 호출
function saveMemo() {
  let memoTitle = newNote.querySelector('#note-box-create__title').value;
  let memoContent = newNote.querySelector('#note-box-create__content').value;
  let now = new Date();

  //uuid와 moment 메서드를 id와 타임스탬프로 활용
  let uuid = uuidv4();
  const timestamp = moment().valueOf();

  let memoId = noteBox.dataset.id;
  let isNewMemo = memoId === undefined || memoId === '';

  // 메모 수정 또는 새 메모 추가
  if (isNewMemo) {
    // 새 메모 추가
    let newMemo = {
      id: uuid,
      createdAt: timestamp,
      title: memoTitle,
      content: memoContent,
      date: `${now.getDate()}`,
      month: `${now.getMonth() -1}`,
      day: `${now.getDay() - 1}`
    };
    memos.push(newMemo);

    // 메모와 id 저장
    localStorage.setItem('memos', JSON.stringify(memos));

    // 리스트에 메모 추가
    addMemoToList(newMemo);
  } else {
    // 기존 메모 수정
    let index = memos.findIndex(m => m.id == memoId);
    if (index !== -1) {
      memos[index].title = memoTitle;
      memos[index].content = memoContent;

      // 로컬스토리지 업데이트
      localStorage.setItem('memos', JSON.stringify(memos));

      // 메모 리스트 업데이트
      updateMemoInList(memoId, memoTitle, memoContent);
    }
  }

  // 제목, 내용 필드 초기화
  clearNoteFields();
}

// 필드 초기화 함수
function clearNoteFields() {
  newNote.querySelector('#note-box-create__title').value = '';
  newNote.querySelector('#note-box-create__content').value = '';
  noteBox.dataset.id = '';
  deleteBtn.style.display = 'none';
}


//검색창 이벤트핸들러
const searchInput = document.querySelector('#search__input');

searchInput.addEventListener('input', function(){
  const query = searchInput.value.toLowerCase().trim();
  // 사용자 입력을 표준화하고 불필요한 공백을 제거하기 위해 value에 매서드 결합
  if (query) {
    searchMemos(query);
  } else {
    setMemo(); // 검색어가 없으면 전체 메모를 다시 표시
  }
})

//검색기능
//filter활용
function searchMemos(query) {
  const filteredMemos = memos.filter(memo =>
    memo.title.toLowerCase().includes(query) || 
    memo.content.toLowerCase().includes(query)
  );
  updateMemoList(filteredMemos); // 필터된 메모 리스트를 업데이트
}

// 필터된 메모 리스트를 UI에 표시하는 함수
function updateMemoList(filteredMemos) {
  const noteList = document.querySelector('#note-list');
  noteList.innerHTML = ''; // 기존 메모 리스트 초기화

  // 필터된 memos 배열을 사용하여 메모 리스트 업데이트
  filteredMemos.forEach(memo => {
    addMemoToList(memo);
  });
}

// 메모 리스트 갱신 함수
function setMemo() {
  const noteList = document.querySelector('#note-list');
  noteList.innerHTML = '';

  // 메모 리스트 업데이트
  memos.forEach(memo => {
    addMemoToList(memo);
  });
}

// 정렬 필터링 함수
// sort()활용
function sortByLatest() {
  memos.sort((a, b) => b.createdAt - a.createdAt);
  setMemo(); // 정렬 후 UI 갱신
}

function sortByEarliest() {
  memos.sort((a, b) => a.createdAt - b.createdAt);
  setMemo(); // 정렬 후 UI 갱신
}

function sortByAlphabetical() {
  memos.sort((a, b) => a.title.localeCompare(b.title));
  setMemo(); // 정렬 후 UI 갱신
}

// 메모 리스트에 메모 추가 함수
function addMemoToList(memo) {
  const noteList = document.querySelector('#note-list');
  const dayList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const monthList = ['January', 'February', 'March', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // note-container div 생성
  let noteContainer = document.createElement('div');
  noteContainer.classList.add('note-container');
  noteContainer.dataset.id = memo.id;

  // 날짜 div 생성
  let date = document.createElement('div');
  date.id = 'note-date';
  date.textContent = memo.date;

  // 요일 div 생성
  let day = document.createElement('div');
  day.id = 'note-dayofweek';
  day.textContent = dayList[memo.day];

  // 월 div 생성
  let month = document.createElement('div');
  month.id = 'note-month';
  month.textContent = monthList[memo.month];

  // 내용 div 생성
  let content = document.createElement('div');
  content.id = 'note-content';
  content.classList.add('note-content-preview');
  content.textContent = memo.content;

  // 제목 div 생성
  let title = document.createElement('div');
  title.id = 'note-title';
  title.textContent = memo.title;

  // 수정 버튼 div 생성
  let modify = document.createElement('div');
  modify.id = 'note-modify';
  modify.textContent = 'modify';
  modify.style.display = 'none'; // 초기 상태는 숨김

  // 왼쪽 부분 생성 및 추가
  let leftDiv = document.createElement('div');
  leftDiv.classList.add('note-container_left');
  leftDiv.appendChild(date);
  leftDiv.appendChild(title);
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

  // 수정 버튼 자바스크립트를 사용한 Hover 기능 추가
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

// 수정 버튼 클릭 시 기존 작성된 내용 불러오기 
function editMemo(id) {
  const index = memos.findIndex(m => m.id == id);
  if (index !== -1) {
    const memo = memos[index];
    document.querySelector('#note-box-create__title').value = memo.title;
    document.querySelector('#note-box-create__content').value = memo.content;
    noteBox.dataset.id = memo.id;
    deleteBtn.style.display = 'inline';
  }
}

// 메모 리스트에서 개별 메모 업데이트 함수
function updateMemoInList(id, title, content) {
  const noteContainer = document.querySelector(`.note-container[data-id='${id}']`);
  if (noteContainer) {
    const contentDiv = noteContainer.querySelector('#note-content');
    contentDiv.textContent = content;

    // titleDiv 수정 (제목은 미리보기에서 표시되지 않는 경우, 이 부분을 필요에 따라 수정)
    // const titleDiv = noteContainer.querySelector('#note-title');
    // titleDiv.textContent = title;
  }
}

// 삭제버튼 클릭 시 현재 불러와진 내용 삭제하기
deleteBtn.addEventListener('click', function (e) {
  //삭제할 메모의 id를 가져옴
  const memoId = noteBox.dataset.id; //  현제 활성화 된 메모의 id를 얻음
  deleteMemo(memoId);
});

// 메모 삭제 함수
function deleteMemo(id) {
  const index = memos.findIndex(m => m.id == id);
  if (index !== -1) {
    //삭제 여부 확인
    const result = confirm('작성한 노트를 삭제하시겠어요? 삭제한 후에는 작업을 되돌릴 수 없습니다.');
    if (result) {
      memos.splice(index, 1); // memos배열에서 제거
      localStorage.setItem('memos', JSON.stringify(memos)); // 로컬스토리지 업데이트

      showMainNote(); // 메모 리스트 화면으로 돌아가기
      setMemo(); // 초기화
      //초기화를 나중에 해야 제대로 작동함... 하 ㄱ-
    }
  }
};

// 각 노트 컨테이너 클릭 시 노트 전체 내용 보여주기 
// 이벤트 위임을 사용해 동적으로 추가된 요소에도 이벤트 리스너 적용
mainNote.addEventListener('click', function (e) {
  const noteContainer = e.target.closest('.note-container');
  if (noteContainer) {
    const noteContainerLeft = noteContainer.querySelector('.note-container_left');
    const content = noteContainerLeft.querySelector('#note-content');
    if (content.classList.contains('note-content-preview')) {
      content.classList.remove('note-content-preview');

    } else {
      content.classList.add('note-content-preview');
    }
  }
});


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
    a.classList = 'filter'
    a.textContent = text;
    dropdownContent.appendChild(a);

    // 링크 클릭 시 버튼 텍스트 변경 및 정렬 함수 호출
    a.addEventListener('click', function (event) {
      event.preventDefault(); // 링크의 기본 동작 막기

      dropdownBtn.textContent = text;
      dropdownContent.classList.remove('show');

      // 선택된 필터에 따라 다르게 동작하도록 설정
      switch (text) {
        case 'Latest':
          // 최신순 정렬 기능
          sortByLatest();
          break;
        case 'Earliest':
          // 오래된 순 정렬 기능
          sortByEarliest();
          break;
        case 'Alphabetical':
          // 알파벳 순 정렬 기능
          sortByAlphabetical();
          break;
      }
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
