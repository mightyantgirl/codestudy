const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

//* 배열에 저장되었던 값을 로컬스토리지에 저장*/
let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
  //로컬스토리지에 배열(toDos)로 추가
  //JSON.stringify : 객체를 문자열로 바꿔줌.
  //JSON.parse : 문자열을 객체로 바꿔줌.
  //localStorage안에 array는 저장되지 않고 텍스트만 저장되기 때문에 메서드를 활용해서 배열형태로 저장하는 것.
};

//* 삭제버튼 작동기능 */
function deletToDo(e){
  const li = e.target.parentElement;
  //(클릭이벤트가 발생한 요소의)부모태그를 이벤트 타겟으로 지정
  li.remove();
  toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
  //filter를 활용해서 내가 선택한 요소의 id가 li의 아이디와 다르다면 출력하게 함. (즉, 내가 선택한 요소와 같다면 false로 보여지지 않음 = 삭제)
  saveToDos();
  //filter로 바뀐 값을 다시 로컬스토리지에 저장
}

//* 인풋에 입력한 내용을 li태그로 생성하여 출력하는 기능 */
function paintToDo(newTodo){
  const li = document.createElement("li");
  //li태그를 생성하는 변수선언
  li.id = newTodo.id;
  //id태그에 id명을 newTodo의 id로 전송
  const span = document.createElement("span");
  //span태그를 생성하는 변수 선언
  span.innerText = newTodo.text;
  //span태그 안에 newTodo저장된 인풋값을 전송
  const button = document.createElement("button");
  //button태그를 생성하는 변수 선언
  button.innerText = "X";
  //button태그의 내용으로 'X'를 출력
  button.addEventListener("click", deletToDo);
  //버튼을 누르면 작동할 이벤트
  li.appendChild(span);
  //li태그 내부에 span태그를 자식태그로 생성
  li.appendChild(button);
  //li태그 내부에 button태그를 자식태그로 생성
  toDoList.appendChild(li);
  //toDoList로 변수선언된 ul태그 내부에 li태그를 자식태그로 생성
  //** append는 함수 맨 뒤에 생성
};


//* 인풋 입력 및 초기화 기능 */
function handleToDoSubmit(e) {
  e.preventDefault();
  //submit의 초기기능 초기화
  const newTodo = toDoInput.value;
  //입력 된 인풋의 값을 변수에 저장
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  //입력 된 인풋 값을 object형태로 저장 각 값에 아이디를 부여하기 위해
  toDos.push(newTodoObj);
  //변수에 저장된 인풋 값을 toDos란 배열에 저장
  paintToDo(newTodoObj);
  //변수에 임시로 저장했던 인풋의 값을 함수의 파라미터로 보냄
  toDoInput.value = "";
  //인풋 값 초기화
  saveToDos();
  //인풋 값 로컬스토리지에 저장
};
toDoForm.addEventListener("submit", handleToDoSubmit);


//* 로컬 스토리지에 문자로 저장되었던 todo값을 배열 형식으로 저장, 각 배열의 값을 활용해(forEach) 함수를 실행 */
const savedTodos = localStorage.getItem(TODOS_KEY);

if(savedTodos !== null){
  const parsedToDos = JSON.parse(savedTodos);
  // parsedToDos.forEach((i) => console.log("hello", i));
  //forEach는 따로 반복문없이 array의 item 하나씩 funcion에 반복해 넣을 수 있게하는 기능.
  //화살표함수를 활용해서 따로 함수선언하지 않고 한 줄로 표현 가능
  //forEach와 화살표함수 다시 한 번 따로 개념학습필요...
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
};


//실행 순서 toDoForm 인풋 작성 > 이벤트발생 > handleToDoSubmit 함수실행 : 인풋값을 변수에 저장 및 초기화, 인풋 값 파라미터로 전송, *인풋 값 스토리지에 저장하는 함수 실행* >  saveToDos 함수 실행 : 로컬 스토리지의 값을 배열로 저장. 우선 객체를 문자열로 바꿔주는 메서드를 사용. > 만약  savedTodos의 값이 null이 아니면 savedTodos의 값을 문자열에서 객체로 변환하는 메서드를 사용해 배열로 저장. 
//forEach함수로 배열 안의 각 item마다 함수를 실행하는데, paintToDo이 실행될 때 생성된 값을 배열로 아우씨모르ㅔㅆ다