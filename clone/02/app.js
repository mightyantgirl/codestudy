const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const EraserBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option"));
  //얘넨 배열로 생성되지 않았음! array.from을 사용하면 htmlcollection을 배열로 바꿔줌 오신기하다
const canvas = document.querySelector("canvas");
const lineWidth = document.querySelector('#line-width');
const color = document.querySelector('#color');

const ctx = canvas.getContext('2d');
//캔버스에 그림 그리는 기능. context는 브러쉬(붓) 2d는 평면기능. 일단 붓을 든거임!
canvas.width = 600;
canvas.height = 600;
//css에 캔버스 크기를 설정하고, js에서도 캔버스가 그려질 크기를 설정해야함
ctx.lineWidth = lineWidth.value;
//ctx의 굵기를 linewidth의 초기 value값으로 설정(5)


// ctx.rect(50, 50, 100, 100);
// //캔버스에 패스를 그렸음! x좌표, y좌표, 가로, 세로 값
// ctx.fill();
// //그린 패스에 색을 채움!

// ctx.beginPath();
// //이전 그리던 패스를 끊음! 초기화.
// ctx.rect(150, 150, 100, 100);
// ctx.stroke();
// //그린 패스에 선을 그림!

// ctx.fillStyle = "red";
// //ctx의 색상을 변경함
// setTimeout(() => {ctx.fill();}, 3000);
// //3초가 지나면 fillstyle을 실행함.

// ctx.moveTo(250,250);
// //붓을 x,y로 이동
// ctx.lineTo(350,250);
// //이동한 위치에서 붓을 캔버스에 긋는 채로 이동. 즉 x 100만큼 패스를 그림.
// ctx.lineTo(350,350); 
// // y 100만큼 패스를 그림
// ctx.lineTo(250,350);
// // x -100만큼 패스를 그림
// ctx.lineTo(250,250);
// // y -100만큼 패스를 그림
// ctx.stroke();
// //선을 안 그리면 화면에 안 보이겟죠?


// ctx.fillRect(200, 200, 50, 200);
// ctx.fillRect(400, 200, 50, 200);
// ctx.lineWidth = 5;
// //선의 가로폭
// ctx.strokeRect(300, 300, 50, 100);
// ctx.fillRect(200, 200, 200, 20);

// ctx.moveTo(200, 200);
// ctx.lineTo(325, 100);
// ctx.lineTo(450, 200);
// ctx.fill();

// ctx.beginPath();
// ctx.arc(50, 50, 50, 0, 2 * Math.PI);
// ctx.fill();

let isPainting = false;
let isFilling = false;

function onMove(e){
    if(isPainting === true){
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        return;
    } else{
        ctx.beginPath();
        //초기화
        ctx.moveTo(e.offsetX, e.offsetY);
    }
};
//설정한 변수가 참이면 라인을 그리고, 아니라면 ctx를 위치로 움직이기만 할거임
//그니까 마우스를 클릭한 상태로 변수가 참이되면 라인을 위치까지 그리고, 아니라면 움직이기만 하는것.
function onMouseDown(){
    isPainting = true;
}
function cancelPainting(){
    isPainting = false;
}
//마우스를 클릭하면 변수를 t, 마우스를 클릭하지 않으면 변수를 f

function onLineWidthChange(e){
    ctx.lineWidth = e.target.value;
}
function onColorChange(e){
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
    ctx.beginPath();
    //초기화
}

function onColorClick(e){
  const colorValue = e.target.dataset.color
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue
}

function onModeClick(e){
  if(isFilling === true){
    isFilling = false;
    modeBtn.innerText = "Fill";
  }else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}
//변수의 상태에 따라 버튼의 텍스트를 바꿔줌

function onCanvasClick(){
  if(isFilling){
    ctx.fillRect(0,0,800,800);
  }
}
//변수가 참일경우 캔버스에 fillRect로 채움

function onDestroyClick(){
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,800,800);
}
//디스트로이 버튼을 클릭하는 경우 fillRect로 흰색을 칠해서 초기화

function onEraserClick(){
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

function onFileChange(e){
  const file = e.target.files[0];
  //첨부된 첫번쨰 파일을 변수로 저장
  const url = URL.createObjectURL(file);
  //파일의 유알엘을 변수로 저장
  const image = new Image();
  image.src = url;
  image.onload = function(){
    ctx.drawImage(image, 0,0,800,800);
  };
  //이미지 불러오기 어떻게? 캔버스 안에
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", cancelPainting);   
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("mouseleave", cancelPainting);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);


colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
EraserBtn.addEventListener("click", onEraserClick)
fileInput.addEventListener("change", onFileChange);