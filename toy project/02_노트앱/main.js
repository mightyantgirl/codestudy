const newNote = document.querySelector('#note-new-create');
const saveBtn = document.querySelector('#note__btn--save');

//로컬스토리지에 memos라는 키를 생성함
let memos = JSON.parse(localStorage.getItem('memos'));
memos = memos ?? [];

//메모 save시 실행되는 이벤트리스너
saveBtn.addEventListener('click', function(){
  let newMemo = {};
  let memoTitle = newNote.querySelector('#note-box-create__title').value;
  let memoContent = newNote.querySelector('#note-box-create__content').value;
  let now = new Date();

  //로컬스토리지에 id값이 없다면 키를 생성하고 0부터 설정
  let id = JSON.parse(localStorage.getItem('id'));
  id = id ?? 0;
  
  //newMemo객체에 id,제목,내용,날짜 저장
  newMemo.id = id;
  newMemo.title = memoTitle;
  newMemo.content = memoContent;
  newMemo.date = `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`;
  memos.push(newMemo);

  //저장할말을 물어보는 confirm
  const result = confirm('메모를 저장하시겠어용?');
  if(result){
    //예를 선택한 경우의 처리
    localStorage.setItem('memos', JSON.stringify(memos));
    localStorage.setItem('id', JSON.stringify(++id));
    newNote.querySelector('#note-box-create__title').value = null; // 제목 필드 초기화
    newNote.querySelector('#note-box-create__content').value = null; // 내용 필드 초기화
  } else {
    // 아니오를 선택한 경우의 처리
    // 별다른 처리를 하지 않으면 작성 중이던 창으로 돌아갑니다
  }
});